import {
  deleteProductRouteSchema,
  getProductsRouteSchema,
  postProductRouteSchema,
  putProductRouteSchema,
} from "@review-dash/shared/schemas";
import { RouterConfig } from "@review-dash/shared/types";
import type { FastifyPluginAsync } from "fastify";

import { ProductsController } from "./products.controller";

const productsRouter: FastifyPluginAsync = async (app) => {
  const controller = new ProductsController();

  app.get("/", { schema: getProductsRouteSchema }, controller.list);
  app.post("/", { schema: postProductRouteSchema }, controller.create);
  app.put("/:id", { schema: putProductRouteSchema }, controller.update);
  app.delete("/:id", { schema: deleteProductRouteSchema }, controller.delete);
};

export const productsRouteConfig: RouterConfig = {
  endpoint: "/products",
  router: productsRouter,
};
