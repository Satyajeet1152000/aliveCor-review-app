import { ReviewEntity } from "./review.entity";
import ReviewRepository from "./review.repository";

export interface ReviewInsertInput {
  externalId: string;
  rating: number;
  title: string | null;
  body: string;
  author: string;
  reviewedAt: Date;
  source: string;
  productUrl: string;
}

export default class ReviewWriter {
  public static async insertMany(reviews: ReviewInsertInput[]): Promise<number> {
    if (reviews.length === 0) {
      return 0;
    }

    const entities = reviews.map((review) => {
      const entity = new ReviewEntity();
      entity.externalId = review.externalId;
      entity.rating = review.rating;
      entity.title = review.title;
      entity.body = review.body;
      entity.author = review.author;
      entity.reviewedAt = review.reviewedAt;
      entity.source = review.source;
      entity.productUrl = review.productUrl;
      return entity;
    });

    await ReviewRepository.insert(entities);
    return entities.length;
  }
}
