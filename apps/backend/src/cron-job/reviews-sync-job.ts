import { ReviewSyncError } from "@modules/reviews/reviews.error";
import ReviewService from "@modules/reviews/reviews.service";
import { env } from "@task-forge/shared/env";
import type { FastifyInstance } from "fastify";
import { AsyncTask, SimpleIntervalJob } from "toad-scheduler";

export const syncReviewsJob = (app: FastifyInstance): SimpleIntervalJob => {
  const id = "cron-job-sync-reviews";

  const syncReviews = async (): Promise<void> => {
    app.log.info(`[Cron Job] Starting - ${id}`);

    try {
      const result = await ReviewService.syncReviews();
      app.log.info(
        `[Cron Job] Completed - ${id}: fetched=${result.fetched}, inserted=${result.inserted}, skipped=${result.skipped}`,
      );
    } catch (error) {
      if (error instanceof ReviewSyncError) {
        app.log.error(error, `[Cron Job Error]: ${error.message} - ${id}`);
        return;
      }

      app.log.error(error, `[Cron Job Error]: Task failed - ${id}`);
    }
  };

  return new SimpleIntervalJob(
    { hours: env?.REVIEW_SYNC_CRON_INTERVAL_HOURS || 8 },
    new AsyncTask(id, syncReviews, (err: Error) => {
      app.log.error(err, `[Cron Job Error]: Task failed - ${id}`);
    }),
    { id, preventOverrun: true },
  );
};
