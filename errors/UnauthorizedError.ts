import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
  constructor(message = "Authorization Failure") {
    super(message, "Unauthorized", 401);
  }
}
