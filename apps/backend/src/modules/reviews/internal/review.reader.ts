import type { Review, ReviewListFilters } from "@task-forge/shared/types";
import { Between, FindOptionsWhere, In, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

import { ReviewEntity } from "./review.entity";
import ReviewRepository from "./review.repository";
import { serializeReview } from "./review.serializer";

function endOfDay(date: Date): Date {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
}

function buildWhereClause(filters: ReviewListFilters): FindOptionsWhere<ReviewEntity> {
  const where: FindOptionsWhere<ReviewEntity> = {};

  if (filters.productUrl) {
    where.productUrl = filters.productUrl;
  }

  if (filters.rating) {
    where.rating = filters.rating;
  }

  if (filters.fromDate && filters.toDate) {
    where.reviewedAt = Between(new Date(filters.fromDate), endOfDay(new Date(filters.toDate)));
  } else if (filters.fromDate) {
    where.reviewedAt = MoreThanOrEqual(new Date(filters.fromDate));
  } else if (filters.toDate) {
    where.reviewedAt = LessThanOrEqual(endOfDay(new Date(filters.toDate)));
  }

  return where;
}

export default class ReviewReader {
  public static async list(filters: ReviewListFilters): Promise<Review[]> {
    const limit = filters.limit ?? 20;

    const reviews = await ReviewRepository.find({
      where: buildWhereClause(filters),
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
