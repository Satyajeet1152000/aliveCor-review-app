import { successResponse } from "@lib/api-response";
import type { FastifyReply, FastifyRequest } from "fastify";

import ReviewService from "./reviews.service";

export class ReviewsController {
  list = async (
    request: FastifyRequest<{ Querystring: { limit?: number } }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const limit = request.query.limit ?? 20;
    const reviews = await ReviewService.listLatest(limit);
    return reply.status(200).send(successResponse(reviews));
  };

  sync = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await ReviewService.syncReviews();
    return reply.status(200).send(successResponse(result, "Reviews synced successfully"));
  };
}
