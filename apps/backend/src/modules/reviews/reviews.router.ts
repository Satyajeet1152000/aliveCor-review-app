import { getReviewsRouteSchema, postReviewSyncRouteSchema } from "@review-dash/shared/schemas";
import { RouterConfig } from "@review-dash/shared/types";
import type { FastifyPluginAsync } from "fastify";

import { ReviewsController } from "./reviews.controller";

const reviewsRouter: FastifyPluginAsync = async (app) => {
  const controller = new ReviewsController();

  app.get("/", { schema: getReviewsRouteSchema }, controller.list);
  app.post(
    "/sync",
    {
      schema: postReviewSyncRouteSchema,
      config: {
        rateLimit: {
          max: 1,
          timeWindow: "2 minutes",
        },
      },
    },
    controller.sync,
  );
};

export const reviewsRouteConfig: RouterConfig = {
  endpoint: "/reviews",
  router: reviewsRouter,
};
