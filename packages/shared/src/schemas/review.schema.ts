import { z } from "zod";

import { RouteTags } from "../types/swagger.types";

import { paginatedSuccessResponseSchema, successResponseSchema } from "./common-schemas";

export const reviewSchema = z.object({
  id: z.number(),
  productId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  title: z.string().nullable(),
  description: z.string().nullable(),
  reviewedAt: z.string(),
  reviewId: z.string().min(1),
  reviewUrl: z.string().url(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const reviewSyncResultSchema = z.object({
  fetched: z.number().int().nonnegative(),
  inserted: z.number().int().nonnegative(),
  skipped: z.number().int().nonnegative(),
});

export const getReviewsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  page: z.coerce.number().int().min(1).default(1),
  productId: z.coerce.number().int().positive().optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  fromDate: z.string().date().optional(),
  toDate: z.string().date().optional(),
});

export const getReviewsRouteSchema = {
  tags: [RouteTags.REVIEWS],
  summary: "List latest reviews",
  description: "Returns a paginated list of the newest reviews from the database.",
  querystring: getReviewsQuerySchema,
  response: {
    200: paginatedSuccessResponseSchema(reviewSchema),
  },
};

export const postReviewSyncRouteSchema = {
  tags: [RouteTags.REVIEWS],
  summary: "Sync reviews from upstream sources",
  description: "Fetches reviews for active products and upserts them into the database.",
  response: {
    200: successResponseSchema(reviewSyncResultSchema),
  },
};
