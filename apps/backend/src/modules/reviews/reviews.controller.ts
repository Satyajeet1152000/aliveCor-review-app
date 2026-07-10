import { paginatedResponse, successResponse } from "@lib/api-response";
import type { ReviewListFilters } from "@review-dash/shared/types";
import type { FastifyReply, FastifyRequest } from "fastify";

import ReviewService from "./reviews.service";

export class ReviewsController {
  list = async (
    request: FastifyRequest<{ Querystring: ReviewListFilters }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const [reviews, total] = await ReviewService.list({
      limit: request.query.limit ?? 10,
      page: request.query.page ?? 1,
      productId: request.query.productId,
      rating: request.query.rating,
      fromDate: request.query.fromDate,
      toDate: request.query.toDate,
    });
    return reply.status(200).send(
      paginatedResponse(reviews, {
        total,
        page: request.query.page ?? 1,
        limit: request.query.limit ?? 10,
        totalPages: Math.ceil(total / (request.query.limit ?? 10)),
      }),
    );
  };

  sync = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await ReviewService.syncReviews();
    return reply.status(200).send(successResponse(result, "Reviews synced successfully"));
  };
}
