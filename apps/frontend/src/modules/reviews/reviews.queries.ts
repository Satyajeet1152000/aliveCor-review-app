import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getReviews, syncReviews } from "./reviews.api";

export const reviewsQueryKey = ["reviews", 20] as const;

export function useReviewsQuery(limit = 20) {
  return useQuery({
    queryKey: ["reviews", limit],
    queryFn: () => getReviews(limit),
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
