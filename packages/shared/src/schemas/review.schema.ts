import { z } from "zod";

import { RouteTags } from "../types/swagger.types";

import { successResponseSchema } from "./common-schemas";

export const reviewSchema = z.object({
  id: z.number(),
  externalId: z.string(),
  rating: z.number().int().min(1).max(5),
  title: z.string().nullable(),
  body: z.string(),
  author: z.string(),
  reviewedAt: z.string(),
  source: z.string(),
  productUrl: z.string().url(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const reviewSyncResultSchema = z.object({
  fetched: z.number().int().nonnegative(),
  inserted: z.number().int().nonnegative(),
  skipped: z.number().int().nonnegative(),
});

export const getReviewsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  productUrl: z.string().url().optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  fromDate: z.string().date().optional(),
  toDate: z.string().date().optional(),
});

export const getReviewsRouteSchema = {
  tags: [RouteTags.REVIEWS],
  summary: "List latest reviews",
  description: "Returns the newest reviews from the database.",
  querystring: getReviewsQuerySchema,
  response: {
    200: successResponseSchema(z.array(reviewSchema)),
  },
};

export const postReviewSyncRouteSchema = {
  tags: [RouteTags.REVIEWS],
  summary: "Sync reviews from upstream sources",
  description: "Fetches reviews from configured product URLs and upserts them into the database.",
  response: {
    200: successResponseSchema(reviewSyncResultSchema),
  },
};
