import AppDataSource from "@database/data-source";

import { ReviewEntity } from "./review.entity";

const ReviewRepository = AppDataSource.getRepository(ReviewEntity);

export default ReviewRepository;
