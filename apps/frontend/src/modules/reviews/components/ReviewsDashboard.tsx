"use client";

import { Icon } from "@iconify/react";
import React from "react";

import { useReviewsQuery, useSyncReviewsMutation } from "../reviews.queries";

import { ReviewCard } from "./ReviewCard";

import { Button } from "@/components/ui/button";

export function ReviewsDashboard(): React.ReactElement {
  const { data: reviews = [], isLoading, isError, error, refetch } = useReviewsQuery(20);
  const syncMutation = useSyncReviewsMutation();

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Dash</h1>
          <p className="text-muted-foreground">
            Latest KardiaMobile reviews from your database via the REST API.
          </p>
        </div>
        <Button onClick={() => syncMutation.mutate()} disabled={syncMutation.isPending}>
          {syncMutation.isPending ? "Syncing..." : "Refresh reviews"}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Icon icon="mdi:loading" className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
          <p className="font-medium text-destructive">Could not load reviews</p>
          <p className="mt-1 text-muted-foreground">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => void refetch()}>
            Retry
          </Button>
        </div>
      ) : null}

      {!isLoading && !isError && reviews.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-lg font-medium">No reviews yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sync mock Amazon reviews into PostgreSQL to populate the dashboard.
          </p>
          <Button
            className="mt-4"
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
          >
            Sync reviews
          </Button>
        </div>
      ) : null}

      {!isLoading && !isError && reviews.length > 0 ? (
        <section className="grid gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </section>
      ) : null}
    </main>
  );
}
