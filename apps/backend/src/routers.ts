import { healthRouteConfig } from "@modules/health";
import { reviewsRouteConfig } from "@modules/reviews";
import { RouterConfig } from "@task-forge/shared/types";

export const routerConfigs: RouterConfig[] = [healthRouteConfig, reviewsRouteConfig];
