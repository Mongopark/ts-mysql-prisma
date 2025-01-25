import { onboardingStatus, UserTypes } from "@prisma/client";
import { hashSync } from "bcrypt";
import prisma from "config/prisma-client";
import { BadRequestError } from "errors";
import { appEmitter } from "events/app-emitters";
import { UserRepository } from "shared/repository/user.respository";
import { generateRandomString } from "utils/generateRandomString";
import { bcryptHashSync, bcryptCompareSync } from "utils/hash";
import { omit, Omit } from "lodash";
import { generateAccessToken } from "utils/jwt";
import { sendMail } from "utils/sendMail";

export class AuthService {
  private userRepository = new UserRepository();
  //super Admin Section
  onboardAgent = async (body: any, userId: string) => {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user) {
      throw new BadRequestError("email already in use");
    }
    const agentType = await prisma.userType.findFirst({
      where: {
        type: UserTypes.AGENT,
      },
    });
    if (!agentType) {
      throw new BadRequestError("user type agent does not exist");
    }

    await prisma.$transaction(async (tx) => {
      const password = generateRandomString(6);

      const hashPassword = bcryptHashSync(password);
      const user = await tx.user.create({
        data: {
          firstName: body.firstName,
          surName: body.surName,
          email: body.email,
          password: hashPassword,
          phoneNumber: body.phoneNumber,
          nin: body.nin,
          gender: body.gender,
          dob: new Date(body.dob),
          subscriptionType: body.subscriptionType,
        },
      });
      await tx.profile.create({
        data: {
          userId: user.id,
          firstName: body.firstName,

          dob: new Date(body.dob),
          surName: body.surName,
        },
      });
      await tx.agent.create({
        data: {
          userId: user?.id,
          carpturNo: body.carpturNo,
          email: body.email,
          onboardinStatus: onboardingStatus.agencyCoverage,
          createdById: userId,
        },
      });
      const otp = await this.userRepository.generateUserOtpCode(
        user.id,
        120,
        tx
      );
      const emailInfo = {
        recipientEmail: body.email,
        body: {
          otpcode: otp,
          firstName: body.firstName,
          surname: body.surName,
          expiresIn: 120,
          password: password,
          userType: UserTypes.AGENT,
          carpturNo: body.carpturNo,
        },
        templateName: "agent-onboarding.handlebars",
        subject: "Agent Onboarding",
      };

      appEmitter.emit("email", emailInfo);
    });
  };
  login = async (body: any) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: body.emailOrCarpturNo,
          },
          {
            tenant: {
              carpturNo: body.emailOrCarpturNo,
            },
          },
          {
            landlord: {
              carpturNo: body.emailOrCarpturNo,
            },
          },
          {
            agent: {
              carpturNo: body.emailOrCarpturNo,
            },
          },
        ],
      },
    });
    if (!user) {
      throw new BadRequestError("invalid credentials");
    }
    const isValidPassword = bcryptCompareSync(body.password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError("invalid credentials");
    }
    const jwtPayload = {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
    };
    const accessToken = generateAccessToken(jwtPayload);
    const newUser = omit(user, "password");

    return {
      ...newUser,
      accessToken,
    };
  };
  generateCarpturNo = () => {
    const carptur = generateRandomString(10);

    return carptur;
  };
}
