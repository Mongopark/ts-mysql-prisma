import { BaseError } from "./BaseError";

export class ExpiredError extends BaseError {
  constructor(message = "Session expired") {
    super(message, "Expired", 407);
  }
}
