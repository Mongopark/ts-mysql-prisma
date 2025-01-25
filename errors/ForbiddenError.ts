import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden Error") {
    super(message, "Forbidden", 403);
  }
}
