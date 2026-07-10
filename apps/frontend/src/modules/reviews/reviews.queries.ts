import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReviewListFilters } from "@task-forge/shared/types";
import { toast } from "sonner";

import { getReviews, syncReviews } from "./reviews.api";

export function reviewsQueryKey(filters: ReviewListFilters) {
  return ["reviews", filters] as const;
}

export function useReviewsQuery(filters: ReviewListFilters) {
  return useQuery({
    queryKey: reviewsQueryKey(filters),
    queryFn: () => getReviews(filters),
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
