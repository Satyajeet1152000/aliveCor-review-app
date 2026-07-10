import { createHash } from "node:crypto";

import { env } from "@task-forge/shared/env";
import type { Review, ReviewSyncResult } from "@task-forge/shared/types";

import ReviewReader from "./internal/review.reader";
import ReviewWriter, { type ReviewInsertInput } from "./internal/review.writer";
import { ReviewSyncError } from "./reviews.error";

interface MockReviewTemplate {
  rating: number;
  title: string;
  body: string;
  author: string;
  daysAgo: number;
}

const MOCK_REVIEW_TEMPLATES: MockReviewTemplate[] = [
  {
    rating: 5,
    title: "Accurate and easy to use",
    body: "KardiaMobile picks up AFib quickly. Setup took under five minutes and the app is intuitive.",
    author: "Sarah M.",
    daysAgo: 1,
  },
  {
    rating: 4,
    title: "Great device, battery could be better",
    body: "Readings match my clinic ECG. Wish the battery lasted a bit longer between charges.",
    author: "James T.",
    daysAgo: 2,
  },
  {
    rating: 3,
    title: "Mixed results on first week",
    body: "Sometimes struggled to get a clean trace until I adjusted finger placement. Support was helpful.",
    author: "Priya K.",
    daysAgo: 3,
  },
  {
    rating: 5,
    title: "Peace of mind at home",
    body: "My cardiologist recommended this and it has already caught an irregular rhythm I did not notice.",
    author: "Michael R.",
    daysAgo: 4,
  },
  {
    rating: 2,
    title: "Connectivity issues",
    body: "App disconnects occasionally on Android. Readings are good when it works.",
    author: "Alex P.",
    daysAgo: 5,
  },
  {
    rating: 4,
    title: "Solid for daily monitoring",
    body: "Compact, travels well, and exports PDFs my doctor accepts without extra formatting.",
    author: "Emily L.",
    daysAgo: 6,
  },
  {
    rating: 5,
    title: "Worth every penny",
    body: "Detected palpitations during workouts. Much faster than waiting for clinic appointments.",
    author: "Daniel W.",
    daysAgo: 7,
  },
];

function buildExternalId(
  source: string,
  productUrl: string,
  author: string,
  title: string,
): string {
  return createHash("sha256").update(`${source}:${productUrl}:${author}:${title}`).digest("hex");
}

function buildMockReviews(productUrls: string[]): ReviewInsertInput[] {
  const now = Date.now();

  return productUrls.flatMap((productUrl) =>
    MOCK_REVIEW_TEMPLATES.map((template) => ({
      externalId: buildExternalId("amazon", productUrl, template.author, template.title),
      rating: template.rating,
      title: template.title,
      body: template.body,
      author: template.author,
      reviewedAt: new Date(now - template.daysAgo * 24 * 60 * 60 * 1000),
      source: "amazon",
      productUrl,
    })),
  );
}

async function fetchUpstreamReviews(productUrls: string[]): Promise<ReviewInsertInput[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, 250);
  });

  if (productUrls.length === 0) {
    throw new ReviewSyncError("No product URLs configured for review sync");
  }

  return buildMockReviews(productUrls);
}

export default class ReviewService {
  public static async listLatest(limit: number): Promise<Review[]> {
    return ReviewReader.listLatest(limit);
  }

  public static async syncReviews(): Promise<ReviewSyncResult> {
    const productUrls = env.REVIEW_PRODUCT_URLS;

    let fetchedReviews: ReviewInsertInput[];
    try {
      fetchedReviews = await fetchUpstreamReviews(productUrls);
    } catch (error) {
      if (error instanceof ReviewSyncError) {
        throw error;
      }
      throw new ReviewSyncError("Upstream review source is unavailable right now");
    }

    const existingIds = await ReviewReader.findExternalIds(
      fetchedReviews.map((review) => review.externalId),
    );

    const newReviews = fetchedReviews.filter((review) => !existingIds.has(review.externalId));
    const inserted = await ReviewWriter.insertMany(newReviews);

    return {
      fetched: fetchedReviews.length,
      inserted,
      skipped: fetchedReviews.length - inserted,
    };
  }
}
