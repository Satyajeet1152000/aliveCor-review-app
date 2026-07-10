import { successResponse } from "@lib/api-response";
import type { ReviewListFilters } from "@task-forge/shared/types";
import type { FastifyReply, FastifyRequest } from "fastify";

import ReviewService from "./reviews.service";

export class ReviewsController {
  list = async (
    request: FastifyRequest<{ Querystring: ReviewListFilters }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const reviews = await ReviewService.list({
      limit: request.query.limit ?? 20,
      productUrl: request.query.productUrl,
      rating: request.query.rating,
      fromDate: request.query.fromDate,
      toDate: request.query.toDate,
    });
    return reply.status(200).send(successResponse(reviews));
  };

  sync = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await ReviewService.syncReviews();
    return reply.status(200).send(successResponse(result, "Reviews synced successfully"));
  };
}
