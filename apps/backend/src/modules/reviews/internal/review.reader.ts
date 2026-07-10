import type { Review } from "@task-forge/shared/types";
import { In } from "typeorm";

import ReviewRepository from "./review.repository";
import { serializeReview } from "./review.serializer";

export default class ReviewReader {
  public static async listLatest(limit: number): Promise<Review[]> {
    const reviews = await ReviewRepository.find({
      order: { reviewedAt: "DESC" },
      take: limit,
    });

    return reviews.map(serializeReview);
  }

  public static async findExternalIds(externalIds: string[]): Promise<Set<string>> {
    if (externalIds.length === 0) {
      return new Set();
    }

    const existing = await ReviewRepository.find({
      where: { externalId: In(externalIds) },
      select: { externalId: true },
    });

    return new Set(existing.map((review) => review.externalId));
  }
}
