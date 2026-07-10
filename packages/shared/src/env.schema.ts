import { z } from "zod";

const envSchema = z.object({
  APP_NAME: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.coerce.number(),
  FRONTEND_URL: z.string().url(),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_CA_CERT: z.string().optional(),

  APIFY_API_TOKEN: z.string().min(1),
  APIFY_AMAZON_REVIEWS_ACTOR: z.string().default("junglee/amazon-reviews-scraper"),

  ENABLE_CRON_JOBS: z
    .string()
    .optional()
    .default("false")
    .transform((value) => value === "true"),

  REVIEW_SYNC_CRON_INTERVAL_HOURS: z.coerce.number().int().min(1).default(8),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
