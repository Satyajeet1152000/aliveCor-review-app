"use client";

import type { Product, Review } from "@review-dash/shared/types";
import React, { useEffect, useRef } from "react";

import { ReviewCard } from "./ReviewCard";

interface ReviewsListProps {
  reviews: Review[];
  products: Product[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

export function ReviewsList({
  reviews,
  products,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: ReviewsListProps): React.ReactElement {
  const productNameById = new Map(products.map((product) => [product.id, product.name]));
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <section className="grid gap-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          productName={productNameById.get(review.productId)}
        />
      ))}

      <div ref={sentinelRef} aria-hidden className="h-px" />

      {isFetchingNextPage && (
        <p className="py-2 text-center text-sm text-muted-foreground">Loading more reviews...</p>
      )}

      {!hasNextPage && reviews.length > 0 && (
        <p className="py-2 text-center text-sm text-muted-foreground">
          You&apos;ve reached the end.
        </p>
      )}
    </section>
  );
}
