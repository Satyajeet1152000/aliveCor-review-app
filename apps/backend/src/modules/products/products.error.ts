import { AppError } from "@lib/error-handler";
import { HttpStatusCode } from "@review-dash/shared/types";

export class ProductNotFoundError extends AppError {
  constructor(message: string) {
    super({
      message,
      error: "ProductNotFoundError",
      statusCode: HttpStatusCode.NOT_FOUND,
    });
  }
}
