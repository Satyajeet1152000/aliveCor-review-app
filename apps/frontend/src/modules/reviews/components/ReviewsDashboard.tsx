"use client";

import { Routes } from "@task-forge/shared/constant";
import type { ReviewListFilters } from "@task-forge/shared/types";
import Link from "next/link";
import React, { useMemo, useState } from "react";

import { useReviewsInfiniteQuery, useSyncReviewsMutation } from "../reviews.queries";

import { ReviewsEmptyState } from "./ReviewsEmptyState";
import { ReviewsErrorState } from "./ReviewsErrorState";
import { ReviewFilterValues, ReviewsFilter } from "./ReviewsFilter";
import { ReviewsList } from "./ReviewsList";
import { ReviewsLoadingState } from "./ReviewsLoadingState";
import { ReviewsNoResultsState } from "./ReviewsNoResultsState";

import { Button } from "@/components/ui/button";
import { useProductsQuery } from "@/modules/products";

const DEFAULT_FILTER_VALUES: ReviewFilterValues = {
  productId: "",
  rating: "",
  fromDate: "",
  toDate: "",
};

function toReviewListFilters(values: ReviewFilterValues): ReviewListFilters {
  return {
    ...(values.productId ? { productId: Number(values.productId) } : {}),
    ...(values.rating ? { rating: Number(values.rating) } : {}),
    ...(values.fromDate ? { fromDate: values.fromDate } : {}),
    ...(values.toDate ? { toDate: values.toDate } : {}),
  };
}

function hasActiveFilters(values: ReviewFilterValues): boolean {
  return Boolean(values.productId || values.rating || values.fromDate || values.toDate);
}

export function ReviewsDashboard(): React.ReactElement {
  const [filterValues, setFilterValues] = useState<ReviewFilterValues>(DEFAULT_FILTER_VALUES);
  const filters = useMemo<ReviewListFilters>(
    () => toReviewListFilters(filterValues),
    [filterValues],
  );

  const { data: products = [] } = useProductsQuery();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviewsInfiniteQuery(filters);
  const syncMutation = useSyncReviewsMutation();

  const reviews = useMemo(
    () => data?.pages.flatMap((page) => page.reviews) ?? [],
    [data],
  );

  const baseReady = !isLoading && !isError;
  const showEmptyState = baseReady && reviews.length === 0 && !hasActiveFilters(filterValues);
  const showFilters = baseReady && !showEmptyState;
  const showNoResultsState = showFilters && reviews.length === 0 && hasActiveFilters(filterValues);
  const showReviewsList = showFilters && reviews.length > 0;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Dash</h1>
          <p className="text-muted-foreground">
            Latest KardiaMobile reviews from your database via the REST API.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href={Routes.PRODUCTS}>Manage products</Link>
          </Button>
          <Button onClick={() => syncMutation.mutate()} disabled={syncMutation.isPending}>
            {syncMutation.isPending ? "Syncing..." : "Refresh reviews"}
          </Button>
        </div>
      </div>

      {isLoading && <ReviewsLoadingState />}

      {isError && (
        <ReviewsErrorState
          message={error instanceof Error ? error.message : "Something went wrong"}
          onRetry={() => void refetch()}
        />
      )}

      {showEmptyState && (
        <ReviewsEmptyState
          onSync={() => syncMutation.mutate()}
          isSyncing={syncMutation.isPending}
        />
      )}

      {showFilters && (
        <ReviewsFilter products={products} values={filterValues} onChange={setFilterValues} />
      )}

      {showNoResultsState && <ReviewsNoResultsState />}

      {showReviewsList && (
        <ReviewsList
          reviews={reviews}
          products={products}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={() => void fetchNextPage()}
        />
      )}
    </main>
  );
}
