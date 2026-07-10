import { ProductService } from "@modules/products";
import type { Product, Review, ReviewListFilters, ReviewSyncResult } from "@task-forge/shared/types";

import ReviewReader from "./internal/review.reader";
import ReviewWriter, { type ReviewInsertInput } from "./internal/review.writer";
import { ReviewSyncError } from "./reviews.error";

async function fetchUpstreamReviews(_products: Product[]): Promise<ReviewInsertInput[]> {
  // Upstream Amazon review integration goes here.
  return [];
}

export default class ReviewService {
  public static async list(filters: ReviewListFilters): Promise<Review[]> {
    return ReviewReader.list(filters);
  }

  public static async syncReviews(): Promise<ReviewSyncResult> {
    const products = await ProductService.listActive();

    if (products.length === 0) {
      throw new ReviewSyncError("No active products configured for review sync");
    }

    let fetchedReviews: ReviewInsertInput[];
    try {
      fetchedReviews = await fetchUpstreamReviews(products);
    } catch (error) {
      if (error instanceof ReviewSyncError) {
        throw error;
      }
      throw new ReviewSyncError("Upstream review source is unavailable right now");
    }

    const existingUrls = await ReviewReader.findReviewUrls(
      fetchedReviews.map((review) => review.reviewUrl),
    );

    const newReviews = fetchedReviews.filter((review) => !existingUrls.has(review.reviewUrl));
    const inserted = await ReviewWriter.insertMany(newReviews);

    return {
      fetched: fetchedReviews.length,
      inserted,
      skipped: fetchedReviews.length - inserted,
    };
  }
}
