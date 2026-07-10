export interface ReviewListFilters {
  limit?: number;
  productUrl?: string;
  rating?: number;
  fromDate?: string;
  toDate?: string;
}

export interface Review {
  id: number;
  externalId: string;
  rating: number;
  title: string | null;
  body: string;
  author: string;
  reviewedAt: string;
  source: string;
  productUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewSyncResult {
  fetched: number;
  inserted: number;
  skipped: number;
}
