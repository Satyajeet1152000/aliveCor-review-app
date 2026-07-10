# syntax=docker/dockerfile:1
# Build from the repository root:
#   docker build -f apps/backend/Dockerfile -t review-dash-backend .

FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

FROM base AS builder

# Copy workspace manifests first so dependency install is cached separately
# from source changes. All workspace manifests are required for a frozen
# install to validate against the lockfile.
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

# Install only the backend and its workspace dependency (@task-forge/shared).
RUN pnpm install --frozen-lockfile --filter @task-forge/backend...

# Copy the sources needed to build the backend.
COPY packages/shared ./packages/shared
COPY apps/backend ./apps/backend

# Builds @task-forge/shared then compiles the backend (tsc + tsc-alias).
RUN pnpm --filter @task-forge/backend build

# Produce a pruned, production-only bundle with @task-forge/shared inlined.
RUN pnpm --filter @task-forge/backend --prod deploy /prod

FROM base AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /prod ./

USER node

EXPOSE 3000

# reflect-metadata must be loaded before TypeORM reads entity decorators.
CMD ["sh", "-c", "node -r reflect-metadata node_modules/typeorm/cli.js migration:run -d dist/database/data-source.js && node -r reflect-metadata dist/app.js"]
