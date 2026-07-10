import { z } from "zod";

import { ProductStatus } from "../types/product.types";
import { RouteTags } from "../types/swagger.types";

import { successResponseSchema } from "./common-schemas";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url(),
  status: z.nativeEnum(ProductStatus),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createProductBodySchema = z.object({
  name: z.string().trim().min(1).max(150),
  url: z.string().url(),
});

export const updateProductBodySchema = z
  .object({
    name: z.string().trim().min(1).max(150).optional(),
    url: z.string().url().optional(),
    status: z.nativeEnum(ProductStatus).optional(),
  })
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

export const productIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const getProductsRouteSchema = {
  tags: [RouteTags.PRODUCTS],
  summary: "List all products",
  response: {
    200: successResponseSchema(z.array(productSchema)),
  },
};

export const postProductRouteSchema = {
  tags: [RouteTags.PRODUCTS],
  summary: "Create a product",
  body: createProductBodySchema,
  response: {
    201: successResponseSchema(productSchema),
  },
};

export const putProductRouteSchema = {
  tags: [RouteTags.PRODUCTS],
  summary: "Update a product",
  params: productIdParamsSchema,
  body: updateProductBodySchema,
  response: {
    200: successResponseSchema(productSchema),
  },
};

export const deleteProductRouteSchema = {
  tags: [RouteTags.PRODUCTS],
  summary: "Deactivate a product",
  params: productIdParamsSchema,
  response: {
    200: successResponseSchema(z.null()),
  },
};
