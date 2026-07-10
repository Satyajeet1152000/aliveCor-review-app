export interface ReviewListFilters {
  limit?: number;
  productId?: number;
  rating?: number;
  fromDate?: string;
  toDate?: string;
}

export interface Review {
  id: number;
  productId: number;
  rating: number;
  title: string | null;
  description: string | null;
  reviewedAt: string;
  reviewId: string;
  reviewUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewSyncResult {
  fetched: number;
  inserted: number;
  skipped: number;
}
