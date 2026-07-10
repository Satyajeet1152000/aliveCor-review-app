import { ReviewEntity } from "./review.entity";
import ReviewRepository from "./review.repository";

export interface ReviewInsertInput {
  productId: number;
  rating: number;
  title: string | null;
  description: string | null;
  reviewedAt: Date;
  reviewUrl: string;
}

export default class ReviewWriter {
  public static async insertMany(reviews: ReviewInsertInput[]): Promise<number> {
    if (reviews.length === 0) {
      return 0;
    }

    const entities = reviews.map((review) => {
      const entity = new ReviewEntity();
      entity.productId = review.productId;
      entity.rating = review.rating;
      entity.title = review.title;
      entity.description = review.description;
      entity.reviewedAt = review.reviewedAt;
      entity.reviewUrl = review.reviewUrl;
      return entity;
    });

    await ReviewRepository.insert(entities);
    return entities.length;
  }
}
