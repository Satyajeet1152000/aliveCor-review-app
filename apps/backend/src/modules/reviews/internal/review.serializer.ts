import type { Review } from "@task-forge/shared/types";

import { ReviewEntity } from "./review.entity";

export const serializeReview = (review: ReviewEntity): Review => {
  return {
    id: Number(review.id),
    externalId: review.externalId,
    rating: review.rating,
    title: review.title,
    body: review.body,
    author: review.author,
    reviewedAt: review.reviewedAt.toISOString(),
    source: review.source,
    productUrl: review.productUrl,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  };
};
