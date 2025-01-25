import { BaseError } from "./BaseError";

export class PaymentRequiredError extends BaseError {
  constructor(message = "Payment Required") {
    super(message, "Payment Required", 402);
  }
}
