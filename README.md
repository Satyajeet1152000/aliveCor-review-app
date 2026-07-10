# The Review Dash

Internal dashboard for AliveCor product reviews. See `TASK.md` for the assignment brief.

## Stack

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, shadcn/ui, TanStack Query
- **Backend:** Fastify 5, TypeORM, PostgreSQL
- **Monorepo:** pnpm workspaces + Turborepo

## Prerequisites

- Node.js 22.x
- pnpm 9.x
- Docker (for PostgreSQL)

## Quick start

```bash
# 1. Install dependencies
pnpm install

# 2. Start PostgreSQL
docker compose up -d

# 3. Configure environment
cp apps/backend/.env.example apps/backend/.env.development
cp apps/frontend/.env.example apps/frontend/.env.development

# 4. Run migrations (from repo root)
pnpm --filter @review-dash/backend run mig:run

# 5. Start dev servers
pnpm dev
```

Open:

- Dashboard: http://localhost:3001
- API health: http://localhost:3000/api/health
- API docs (dev): http://localhost:3000/docs

## First-time data load

The dashboard reads reviews from PostgreSQL via the REST API. On first run the table is empty.

1. Open the dashboard at http://localhost:3001
2. Click **Refresh reviews** to call `POST /api/reviews/sync`

The current sync implementation uses a **mock upstream fetcher** (no Amazon API key required). It upserts deduplicated reviews for the three product URLs listed in `TASK.md`.

## API endpoints

| Method | Path                    | Description                               |
| ------ | ----------------------- | ----------------------------------------- |
| `GET`  | `/api/docs`             | Swagger documentation                     |
| `GET`  | `/api/health`           | Service health check                      |
| `GET`  | `/api/reviews?limit=20` | Latest reviews, newest first              |
| `POST` | `/api/reviews/sync`     | Fetch upstream reviews and upsert into DB |

## Project layout

```text
apps/
  backend/     Fastify REST API + review sync
  frontend/    Next.js dashboard
packages/
  shared/      Zod schemas, shared types, env validation
```

## Environment variables

### Backend (`apps/backend/.env.development`)

| Variable              | Purpose                                     |
| --------------------- | ------------------------------------------- |
| `DATABASE_*`          | PostgreSQL connection                       |
| `FRONTEND_URL`        | CORS allowlist                              |
| `REVIEW_PRODUCT_URLS` | Comma-separated Amazon product URLs to sync |

### Frontend (`apps/frontend/.env.development`)

| Variable              | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_API_URL` | Backend base URL for the Next.js API proxy |

## Useful commands

```bash
pnpm dev                              # start backend + frontend
pnpm build                            # build all packages
pnpm --filter @review-dash/backend run mig:gen   # generate migration
pnpm --filter @review-dash/backend run mig:run   # run migrations
pnpm --filter @review-dash/backend run mig:revert
```

## Notes

- Auth was removed — this is scoped as an internal tool per `TASK.md`.
- Upstream review fetching is mocked for local development. Replace `fetchUpstreamReviews` in `apps/backend/src/modules/reviews/reviews.service.ts` with a real provider when ready.
- Complete `SUBMISSION.md` by hand before submitting.
