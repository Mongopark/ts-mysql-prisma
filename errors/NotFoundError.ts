import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message = "Resource Not Found") {
    super(message, "Not Found", 404);
  }
}
