import type { ApiResponse, Review, ReviewListFilters, ReviewSyncResult } from "@task-forge/shared/types";

import { apiClient } from "@/lib/axios";

export async function getReviews(filters: ReviewListFilters = {}): Promise<Review[]> {
  const response = await apiClient.get<ApiResponse<Review[]>>("/reviews", {
    params: {
      limit: filters.limit ?? 20,
      ...(filters.productId ? { productId: filters.productId } : {}),
      ...(filters.rating ? { rating: filters.rating } : {}),
      ...(filters.fromDate ? { fromDate: filters.fromDate } : {}),
      ...(filters.toDate ? { toDate: filters.toDate } : {}),
    },
  });
  return response.data.data ?? [];
}

export async function syncReviews(): Promise<ReviewSyncResult> {
  const response = await apiClient.post<ApiResponse<ReviewSyncResult>>("/reviews/sync");
  return response.data.data ?? { fetched: 0, inserted: 0, skipped: 0 };
}
