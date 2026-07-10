import type { Review } from "@task-forge/shared/types";
import { Star } from "lucide-react";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewCardProps {
  review: Review;
}

function RatingStars({ rating }: { rating: number }): React.ReactElement {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: ReviewCardProps): React.ReactElement {
  const reviewedDate = new Date(review.reviewedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-base">{review.title ?? "Untitled review"}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {review.author} · {reviewedDate} · {review.source}
            </p>
          </div>
          <RatingStars rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-6 text-foreground">{review.body}</p>
        <a
          href={review.productUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-primary hover:underline"
        >
          View product
        </a>
      </CardContent>
    </Card>
  );
}
