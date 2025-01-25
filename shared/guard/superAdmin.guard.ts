import { RequestHandler } from "express";
import { Landlord, UserTypes } from "@prisma/client";
import prisma from "config/prisma-client";
import { ForbiddenError } from "errors";

export const superAdminGuard: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
        UserType: {
          some: {
            type: UserTypes.SUPERADMIN,
          },
        },
      },
    });
    if (!user) {
      throw new ForbiddenError(
        "you are not permitted to perform this operation"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
