import type { Product, Review } from "@task-forge/shared/types";
import React from "react";

import { ReviewCard } from "./ReviewCard";

interface ReviewsListProps {
  reviews: Review[];
  products: Product[];
}

export function ReviewsList({ reviews, products }: ReviewsListProps): React.ReactElement {
  const productNameById = new Map(products.map((product) => [product.id, product.name]));

  return (
    <section className="grid gap-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          productName={productNameById.get(review.productId)}
        />
      ))}
    </section>
  );
}
