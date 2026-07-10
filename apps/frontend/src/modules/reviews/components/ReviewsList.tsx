import type { Review } from "@task-forge/shared/types";
import React from "react";

import { ReviewCard } from "./ReviewCard";

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps): React.ReactElement {
  return (
    <section className="grid gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
}
