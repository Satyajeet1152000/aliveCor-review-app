import { z } from "zod";

import { ProductStatus } from "../types/product.types";
import { RouteTags } from "../types/swagger.types";

import { successResponseSchema } from "./common-schemas";

const AMAZON_SHORT_LINK_HOSTS = new Set(["amzn.in", "amzn.to", "a.co", "amz.onl"]);

export const amazonProductUrlSchema = z
  .string()
  .trim()
  .url({ message: "Enter a valid URL" })
  .superRefine((url, ctx) => {
    let parsed: URL;

    try {
      parsed = new URL(url);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid URL",
      });
      return;
    }

    const hostname = parsed.hostname.replace(/^www\./i, "").toLowerCase();

    if (AMAZON_SHORT_LINK_HOSTS.has(hostname)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Short Amazon links are not allowed. Use a full product URL like https://www.amazon.in/dp/B07RQW6SD5",
      });
      return;
    }

    const isAmazonHost = /^amazon\.[a-z.]+$/i.test(hostname);
    const hasDpAsin = /\/dp\/[A-Z0-9]{10}(?:\/|$)/i.test(parsed.pathname);

    if (!isAmazonHost || !hasDpAsin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "URL must be a full Amazon product link containing /dp/ASIN (e.g. https://www.amazon.in/dp/B07RQW6SD5)",
      });
    }
  });

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
  url: amazonProductUrlSchema,
});

export const updateProductBodySchema = z
  .object({
    name: z.string().trim().min(1).max(150).optional(),
    url: amazonProductUrlSchema.optional(),
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
