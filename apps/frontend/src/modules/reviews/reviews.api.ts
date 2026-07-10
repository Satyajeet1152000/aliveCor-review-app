import type { ApiResponse, Review, ReviewSyncResult } from "@task-forge/shared/types";

import { apiClient } from "@/lib/axios";

export async function getReviews(limit = 20): Promise<Review[]> {
  const response = await apiClient.get<ApiResponse<Review[]>>("/reviews", {
    params: { limit },
  });
  return response.data.data ?? [];
}

export async function syncReviews(): Promise<ReviewSyncResult> {
  const response = await apiClient.post<ApiResponse<ReviewSyncResult>>("/reviews/sync");
  return response.data.data ?? { fetched: 0, inserted: 0, skipped: 0 };
}
