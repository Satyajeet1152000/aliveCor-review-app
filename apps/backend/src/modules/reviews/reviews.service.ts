import { ProductService } from "@modules/products";
import type {
  Review,
  ReviewListFilters,
  ReviewSyncResult,
  Product,
} from "@task-forge/shared/types";

import ReviewReader from "./internal/review.reader";
import ReviewWriter from "./internal/review.writer";
import Apify from "./reviews.apify";
import { ReviewSyncError } from "./reviews.error";

const PRODUCT_REVIEW_SYNC_COOLDOWN_MS = 2 * 60 * 60 * 1000;

export default class ReviewService {
  public static async list(filters: ReviewListFilters): Promise<Review[]> {
    return ReviewReader.list(filters);
  }

  public static async syncReviews(): Promise<ReviewSyncResult> {
    const products = await ProductService.listActive();

    if (products.length === 0) {
      throw new ReviewSyncError("No active products configured for review sync");
    }

    try {
      const results: ReviewSyncResult[] = [];

      for (const product of products) {
        const result = await ReviewService.syncProductReviews(product);
        results.push(result);
      }

      return results.reduce<ReviewSyncResult>(
        (totals, result) => ({
          fetched: totals.fetched + result.fetched,
          inserted: totals.inserted + result.inserted,
          skipped: totals.skipped + result.skipped,
        }),
        { fetched: 0, inserted: 0, skipped: 0 },
      );
    } catch (error) {
      if (error instanceof ReviewSyncError) {
        throw error;
      }
      throw new ReviewSyncError("Upstream review source is unavailable right now");
    }
  }

  private static async syncProductReviews(product: Product): Promise<ReviewSyncResult> {
    const shouldSkipFetch = await ReviewService.hasRecentlyFetchedReviews(product.id);
    if (shouldSkipFetch) {
      return { fetched: 0, inserted: 0, skipped: 0 };
    }

    const fetchedReviews = await Apify.fetchAmazonReviews(product);

    if (fetchedReviews.length === 0) {
      return { fetched: 0, inserted: 0, skipped: 0 };
    }

    const existingReviewIds = await ReviewReader.findReviewIds(
      fetchedReviews.map((review) => review.reviewId),
    );

    const newReviews = fetchedReviews.filter((review) => !existingReviewIds.has(review.reviewId));
    const inserted = await ReviewWriter.insertMany(newReviews);

    return {
      fetched: fetchedReviews.length,
      inserted,
      skipped: fetchedReviews.length - inserted,
    };
  }

  private static async hasRecentlyFetchedReviews(productId: number): Promise<boolean> {
    const latestFetchedAt = await ReviewReader.findLatestFetchedAtByProductId(productId);

    if (!latestFetchedAt) {
      return false;
    }

    return Date.now() - latestFetchedAt.getTime() < PRODUCT_REVIEW_SYNC_COOLDOWN_MS;
  }
}
