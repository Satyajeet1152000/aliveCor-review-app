import { env } from "@task-forge/shared/env";
import type { Product } from "@task-forge/shared/types";
import axios, { isAxiosError } from "axios";

import type { ReviewInsertInput } from "./internal/review.writer";
import { ReviewSyncError } from "./reviews.error";

const APIFY_BASE_URL = "https://api.apify.com/v2";
const DEFAULT_REVIEWS_PER_PRODUCT = 10;
const APIFY_RUN_TIMEOUT_SECS = 300;
const APIFY_POLL_WAIT_SECS = 60;

const TERMINAL_RUN_STATUSES = new Set(["SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"]);

interface ApifyAmazonReviewItem {
  productAsin?: string;
  ratingScore?: number;
  reviewTitle?: string | null;
  reviewDescription?: string | null;
  date?: string;
  country?: string;
  variant?: string | null;
  isVerified?: boolean;
  position?: number;
  reviewUrl?: string;
}

interface ApifyRun {
  id: string;
  status: string;
  defaultDatasetId: string;
  statusMessage?: string;
}

export default class Apify {
  public static async fetchAmazonReviews(
    product: Product,
    maxReviews = DEFAULT_REVIEWS_PER_PRODUCT,
  ): Promise<ReviewInsertInput[]> {
    if (!env.APIFY_API_TOKEN) {
      throw new ReviewSyncError("Apify API token is not configured");
    }

    try {
      return await Apify.fetchReviewsForProduct(product, maxReviews);
    } catch (error) {
      if (error instanceof ReviewSyncError) {
        throw error;
      }
      throw new ReviewSyncError(`Failed to fetch reviews for "${product.name}"`);
    }
  }

  private static async fetchReviewsForProduct(
    product: Product,
    maxReviews: number,
  ): Promise<ReviewInsertInput[]> {
    const actorId = Apify.getActorId();
    const input = {
      productUrls: [{ url: product.url }],
      maxReviews,
      filterByRatings: ["allStars"],
    };

    const run = await Apify.startActorRun(actorId, input);
    const finishedRun = await Apify.waitForRun(run.id, product.name);
    const items = await Apify.getDatasetItems(finishedRun.defaultDatasetId);

    return items
      .map((item) => Apify.mapReview(item, product.id))
      .filter((review): review is ReviewInsertInput => review !== null);
  }

  private static async startActorRun(actorId: string, input: object): Promise<ApifyRun> {
    try {
      const { data } = await axios.post<{ data: ApifyRun }>(
        `${APIFY_BASE_URL}/actors/${actorId}/runs`,
        input,
        {
          params: {
            token: env.APIFY_API_TOKEN,
            timeout: APIFY_RUN_TIMEOUT_SECS,
          },
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return data.data;
    } catch (error) {
      throw Apify.toReviewSyncError(error, "Failed to start Apify actor run");
    }
  }

  private static async waitForRun(runId: string, productName: string): Promise<ApifyRun> {
    const deadline = Date.now() + APIFY_RUN_TIMEOUT_SECS * 1000;
    let run: ApifyRun | undefined;

    while (Date.now() <= deadline) {
      try {
        const { data } = await axios.get<{ data: ApifyRun }>(
          `${APIFY_BASE_URL}/actor-runs/${runId}`,
          {
            params: {
              token: env.APIFY_API_TOKEN,
              waitForFinish: APIFY_POLL_WAIT_SECS,
            },
          },
        );

        run = data.data;

        if (TERMINAL_RUN_STATUSES.has(run.status)) {
          break;
        }
      } catch (error) {
        throw Apify.toReviewSyncError(error, `Failed while waiting for Apify run for "${productName}"`);
      }
    }

    if (!run || !TERMINAL_RUN_STATUSES.has(run.status)) {
      throw new ReviewSyncError(
        `Apify run for "${productName}" timed out after ${APIFY_RUN_TIMEOUT_SECS} seconds`,
      );
    }

    if (run.status !== "SUCCEEDED") {
      throw new ReviewSyncError(
        `Apify run for "${productName}" finished with status ${run.status}: ${run.statusMessage ?? "unknown error"}`,
      );
    }

    return run;
  }

  private static async getDatasetItems(datasetId: string): Promise<ApifyAmazonReviewItem[]> {
    try {
      const { data } = await axios.get<ApifyAmazonReviewItem[]>(
        `${APIFY_BASE_URL}/datasets/${datasetId}/items`,
        {
          params: {
            token: env.APIFY_API_TOKEN,
            format: "json",
            clean: true,
          },
        },
      );

      return data;
    } catch (error) {
      throw Apify.toReviewSyncError(error, "Failed to fetch Apify dataset items");
    }
  }

  private static toReviewSyncError(error: unknown, fallbackMessage: string): ReviewSyncError {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? "unknown";
      const errorBody =
        typeof error.response?.data === "string"
          ? error.response.data
          : JSON.stringify(error.response?.data ?? error.message);
      return new ReviewSyncError(`${fallbackMessage} (${status}): ${errorBody.slice(0, 200)}`);
    }

    return new ReviewSyncError(fallbackMessage);
  }

  private static getActorId(): string {
    return env.APIFY_AMAZON_REVIEWS_ACTOR.replace("/", "~");
  }

  public static extractReviewId(reviewUrl: string): string | null {
    const match = reviewUrl.match(/\/customer-reviews\/([^/?#]+)/i);
    if (match?.[1]) {
      return match[1];
    }

    try {
      const segments = new URL(reviewUrl).pathname.split("/").filter(Boolean);
      return segments.at(-1) ?? null;
    } catch {
      return null;
    }
  }

  private static parseReviewedAt(date?: string): Date {
    if (!date) {
      return new Date();
    }

    const parsed = Date.parse(date);
    if (Number.isNaN(parsed)) {
      return new Date();
    }

    return new Date(parsed);
  }

  private static mapReview(
    item: ApifyAmazonReviewItem,
    productId: number,
  ): ReviewInsertInput | null {
    if (!item.reviewUrl) {
      return null;
    }

    const reviewId = Apify.extractReviewId(item.reviewUrl);
    if (!reviewId) {
      return null;
    }

    const rating = Math.round(item.ratingScore ?? 0);
    if (rating < 1 || rating > 5) {
      return null;
    }

    return {
      productId,
      rating,
      title: item.reviewTitle?.trim() || null,
      description: item.reviewDescription?.trim() || null,
      reviewedAt: Apify.parseReviewedAt(item.date),
      reviewId,
      reviewUrl: item.reviewUrl,
    };
  }
}
