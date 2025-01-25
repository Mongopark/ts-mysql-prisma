import { configs } from "config/app.config";
import { UnauthorizedError } from "errors";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new UnauthorizedError("Unauthorized");

    jwt.verify(token, `${configs.JWT_AUTH_SECRET}`, (err, user) => {
      if (err)
        throw new UnauthorizedError("Authorization failure, Kindly login");

      if (user) {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    next(err);
  }
};
