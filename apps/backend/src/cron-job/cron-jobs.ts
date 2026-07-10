import { env } from "@task-forge/shared/env";
import type { FastifyInstance } from "fastify";
import { Task, SimpleIntervalJob } from "toad-scheduler";

import { syncReviewsJob } from "./reviews-sync-job";

const heartbeatJob = (app: FastifyInstance): SimpleIntervalJob => {
  const id = "cron-job-heartbeat";
  const heartbeatTask = new Task(id, () => {
    app.log.info("[Cron Job] heartbeat (every 5 minutes)");
  });
  return new SimpleIntervalJob({ minutes: 5 }, heartbeatTask, { id });
};

export const getCronJobs = (app: FastifyInstance): SimpleIntervalJob[] => {
  const jobs: SimpleIntervalJob[] = [];

  if (env.NODE_ENV === "development") {
    jobs.push(heartbeatJob(app));
  }

  jobs.push(syncReviewsJob(app));

  return jobs;
};
