import { Prisma } from "@prisma/client";
import prisma from "config/prisma-client";
import {
  BadRequestError,
  BaseError,
  ForbiddenError,
  NotFoundError,
} from "errors";
import { addMinutesToCurrentTime } from "utils/date";
import { generateOtp } from "utils/generate-otp";
import { bcryptCompareSync, bcryptHashSync } from "utils/hash";
import { generateAccessToken } from "utils/jwt";


export class UserRepository {
    public generateUserOtpCode = async (
      userId: string,
      timeToExpireMinutes: number,
      tx?: Prisma.TransactionClient
    ) => {
      const otpcode = generateOtp();
      const prismaClient = tx || prisma;
  
      const currentDate = new Date();
      const expiresAt = new Date(
        addMinutesToCurrentTime(currentDate, timeToExpireMinutes)
      );
  
      await prismaClient.userOtp.upsert({
        where: {
          userId: userId,
        },
        create: {
          user: { connect: { id: userId } },
          otpcode,
          expiresAt,
        },
        update: {
          otpcode,
          expiresAt,
        },
      });
  
      return otpcode;
    };
}