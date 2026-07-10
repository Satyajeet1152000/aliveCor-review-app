import { REVIEW_RATING_OPTIONS } from "@task-forge/shared/constant";
import type { Product } from "@task-forge/shared/types";
import { X } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ReviewFilterValues {
  productId: string;
  rating: string;
  fromDate: string;
  toDate: string;
}

interface ReviewsFilterProps {
  products: Product[];
  values: ReviewFilterValues;
  onChange: (values: ReviewFilterValues) => void;
}

const selectClassName =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function ReviewsFilter({
  products,
  values,
  onChange,
}: ReviewsFilterProps): React.ReactElement {
  const hasDateRange = Boolean(values.fromDate || values.toDate);

  const update = (patch: Partial<ReviewFilterValues>): void => {
    onChange({ ...values, ...patch });
  };

  const clearDates = (): void => {
    onChange({ ...values, fromDate: "", toDate: "" });
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="review-product-filter">Product</Label>
          <select
            id="review-product-filter"
            className={selectClassName}
            value={values.productId}
            onChange={(event) => update({ productId: event.target.value })}
          >
            <option value="">All products</option>
            {products.map((product) => (
              <option key={product.id} value={String(product.id)}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-rating-filter">Rating</Label>
          <select
            id="review-rating-filter"
            className={selectClassName}
            value={values.rating}
            onChange={(event) => update({ rating: event.target.value })}
          >
            <option value="">All ratings</option>
            {REVIEW_RATING_OPTIONS.map((rating) => (
              <option key={rating} value={String(rating)}>
                {rating} star{rating === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-from-date">From date</Label>
          <Input
            id="review-from-date"
            type="date"
            value={values.fromDate}
            onChange={(event) => update({ fromDate: event.target.value })}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="review-to-date">To date</Label>
            {hasDateRange ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs text-muted-foreground"
                onClick={clearDates}
                aria-label="Clear date range"
              >
                <X className="h-3.5 w-3.5" />
                Clear dates
              </Button>
            ) : null}
          </div>
          <Input
            id="review-to-date"
            type="date"
            value={values.toDate}
            min={values.fromDate || undefined}
            onChange={(event) => update({ toDate: event.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
