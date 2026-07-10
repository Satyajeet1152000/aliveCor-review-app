import type { Review } from "@task-forge/shared/types";

import { ReviewEntity } from "./review.entity";

export const serializeReview = (review: ReviewEntity): Review => {
  return {
    id: Number(review.id),
    productId: Number(review.productId),
    rating: review.rating,
    title: review.title,
    description: review.description,
    reviewedAt: review.reviewedAt.toISOString(),
    reviewId: review.reviewId,
    reviewUrl: review.reviewUrl,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  };
};
