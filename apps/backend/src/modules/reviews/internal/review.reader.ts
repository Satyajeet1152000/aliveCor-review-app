import type { Review, ReviewListFilters } from "@review-dash/shared/types";
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

  if (filters.productId) {
    where.productId = filters.productId;
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
  public static async list(filters: ReviewListFilters): Promise<[Review[], number]> {
    const limit = filters.limit ?? 10;
    const page = filters.page ?? 1;

    const [reviews, total] = await ReviewRepository.findAndCount({
      where: buildWhereClause(filters),
      order: { reviewedAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return [reviews.map(serializeReview), total];
  }

  public static async findReviewIds(reviewIds: string[]): Promise<Set<string>> {
    if (reviewIds.length === 0) {
      return new Set();
    }

    const existing = await ReviewRepository.find({
      where: { reviewId: In(reviewIds) },
      select: { reviewId: true },
    });

    return new Set(existing.map((review) => review.reviewId));
  }

  public static async findLatestFetchedAtByProductId(productId: number): Promise<Date | null> {
    const latestReview = await ReviewRepository.findOne({
      where: { productId },
      order: { createdAt: "DESC" },
      select: { createdAt: true },
    });

    return latestReview?.createdAt ?? null;
  }
}
