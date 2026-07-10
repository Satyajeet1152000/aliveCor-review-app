import { fastifyRequestContextPlugin, requestContext } from "@lib/request-context";
import type { FastifyInstance } from "fastify";

export async function registerRequestContext(app: FastifyInstance): Promise<void> {
  await app.register(fastifyRequestContextPlugin);

  app.addHook("onRequest", async (req) => {
    requestContext.set("requestId", req.id);
  });
}
