import { z } from "zod";

export function successResponseSchema<T extends z.ZodTypeAny>(
  dataSchema: T,
): z.ZodObject<{
  data: T;
  success: z.ZodLiteral<true>;
}> {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional(),
  });
}

export const paginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export function paginatedSuccessResponseSchema<T extends z.ZodTypeAny>(
  dataSchema: T,
): z.ZodObject<{
  data: z.ZodArray<T, "many">;
  success: z.ZodLiteral<true>;
}> {
  return z.object({
    success: z.literal(true),
    data: z.array(dataSchema),
    meta: paginationMetaSchema,
    message: z.string().optional(),
  });
}
