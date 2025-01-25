import { RequestHandler } from "express";
import { Landlord } from "@prisma/client";
import prisma from "config/prisma-client";
import { ForbiddenError } from "errors";

export const landlordGuard: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.landlord.findFirst({
      where: {
        userId: req.user.id,
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
