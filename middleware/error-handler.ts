import { Request, Response, NextFunction } from "express";
import { BaseError } from "errors";
import { logger } from "helper/logger";

export async function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "ValidationError") err.statusCode = 400;

  logger.error(err.message, `${JSON.stringify(err.statusCode)}`);
  return res.status(err.statusCode || 500).json({
    success: false,
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });
}
