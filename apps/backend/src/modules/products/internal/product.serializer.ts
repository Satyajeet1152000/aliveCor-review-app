import type { Product } from "@review-dash/shared/types";

import { ProductEntity } from "./product.entity";

export const serializeProduct = (product: ProductEntity): Product => {
  return {
    id: Number(product.id),
    name: product.name,
    url: product.url,
    status: product.status,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
};
