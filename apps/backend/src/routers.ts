import { healthRouteConfig } from "@modules/health";
import { productsRouteConfig } from "@modules/products";
import { reviewsRouteConfig } from "@modules/reviews";
import { RouterConfig } from "@task-forge/shared/types";

export const routerConfigs: RouterConfig[] = [
  healthRouteConfig,
  productsRouteConfig,
  reviewsRouteConfig,
];
