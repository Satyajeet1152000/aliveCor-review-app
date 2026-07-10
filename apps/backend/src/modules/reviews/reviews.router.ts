import { getReviewsRouteSchema, postReviewSyncRouteSchema } from "@task-forge/shared/schemas";
import { RouterConfig } from "@task-forge/shared/types";
import type { FastifyPluginAsync } from "fastify";

import { ReviewsController } from "./reviews.controller";

const reviewsRouter: FastifyPluginAsync = async (app) => {
  const controller = new ReviewsController();

  app.get("/", { schema: getReviewsRouteSchema }, controller.list);
  app.post("/sync", { schema: postReviewSyncRouteSchema }, controller.sync);
};

export const reviewsRouteConfig: RouterConfig = {
  endpoint: "/reviews",
  router: reviewsRouter,
};
