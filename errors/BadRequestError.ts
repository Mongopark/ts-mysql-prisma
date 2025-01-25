import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string = "Bad Request Error") {
    super(message, "Bad Request", 400);
  }
}
