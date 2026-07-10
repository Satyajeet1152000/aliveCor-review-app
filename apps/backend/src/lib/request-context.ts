import type { FastifyPluginCallback } from "fastify";

interface RequestContextStore {
  get(key: "requestId"): string | undefined;
  set(key: "requestId", value: string): void;
}

interface RequestContextModule {
  default: FastifyPluginCallback;
  requestContext: RequestContextStore;
}

// CJS module uses `export =` with helpers attached to module.exports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const requestContextModule = require("@fastify/request-context") as RequestContextModule;

export const fastifyRequestContextPlugin = requestContextModule.default;
export const requestContext = requestContextModule.requestContext;
