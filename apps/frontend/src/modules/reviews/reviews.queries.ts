import type { ReviewListFilters } from "@review-dash/shared/types";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getReviews, syncReviews } from "./reviews.api";

export const REVIEWS_PAGE_SIZE = 10;

export function reviewsQueryKey(filters: ReviewListFilters) {
  return ["reviews", filters] as const;
}

export function useReviewsInfiniteQuery(filters: ReviewListFilters) {
  return useInfiniteQuery({
    queryKey: reviewsQueryKey(filters),
    queryFn: ({ pageParam }) =>
      getReviews({ ...filters, page: pageParam, limit: REVIEWS_PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}

export function useSyncReviewsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncReviews,
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success(`Synced ${result.inserted} new review${result.inserted === 1 ? "" : "s"}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to sync reviews");
    },
  });
}
