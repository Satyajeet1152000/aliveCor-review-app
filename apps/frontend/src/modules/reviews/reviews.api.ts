import type {
  ApiResponse,
  PaginationMeta,
  Review,
  ReviewListFilters,
  ReviewSyncResult,
} from "@task-forge/shared/types";

import { apiClient } from "@/lib/axios";

export interface PaginatedReviews {
  reviews: Review[];
  meta: PaginationMeta;
}

export async function getReviews(filters: ReviewListFilters = {}): Promise<PaginatedReviews> {
  const limit = filters.limit ?? 10;
  const page = filters.page ?? 1;

  const response = await apiClient.get<ApiResponse<Review[]>>("/reviews", {
    params: {
      limit,
      page,
      ...(filters.productId ? { productId: filters.productId } : {}),
      ...(filters.rating ? { rating: filters.rating } : {}),
      ...(filters.fromDate ? { fromDate: filters.fromDate } : {}),
      ...(filters.toDate ? { toDate: filters.toDate } : {}),
    },
  });

  const reviews = response.data.data ?? [];
  const meta = response.data.meta ?? {
    total: reviews.length,
    page,
    limit,
    totalPages: 1,
  };

  return { reviews, meta };
}

export async function syncReviews(): Promise<ReviewSyncResult> {
  const response = await apiClient.post<ApiResponse<ReviewSyncResult>>("/reviews/sync");
  return response.data.data ?? { fetched: 0, inserted: 0, skipped: 0 };
}
