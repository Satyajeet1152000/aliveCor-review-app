import fastifySchedule from "@fastify/schedule";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { getCronJobs } from "../cron-job/cron-jobs";

async function schedulePlugin(app: FastifyInstance): Promise<void> {
  await app.register(fastifySchedule);

  const jobs = getCronJobs(app);

  jobs.forEach((job) => {
    app.scheduler.addSimpleIntervalJob(job);
  });
}

export const registerSchedule = fp(schedulePlugin, { name: "schedule" });
