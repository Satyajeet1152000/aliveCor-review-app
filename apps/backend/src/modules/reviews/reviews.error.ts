import { AppError } from "@lib/error-handler";
import { HttpStatusCode } from "@task-forge/shared/types";

export class ReviewSyncError extends AppError {
  constructor(message: string) {
    super({
      message,
      error: "ReviewSyncError",
      statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
    });
  }
}
