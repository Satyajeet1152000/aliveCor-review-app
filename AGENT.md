# Review Dash — monorepo guide

Review Dash is an internal AliveCor tool for collecting and displaying product reviews. It is built as a **pnpm + Turborepo** monorepo.

---

## 1. Stack overview

| Layer | Package / path | Stack |
| --- | --- | --- |
| Root | `package.json` | pnpm workspaces, Turborepo, shared ESLint/Prettier/TypeScript |
| Shared | `packages/shared` (`@review-dash/shared`) | Zod env validation, API schemas, shared types |
| API | `apps/backend` (`@review-dash/backend`) | Fastify 5, `fastify-type-provider-zod`, TypeORM, PostgreSQL |
| Web | `apps/frontend` (`@review-dash/frontend`) | Next.js 15 App Router, Tailwind CSS, shadcn/ui, TanStack Query |

---

## 2. Directory layout

```text
aliveCor-review-app/
├── package.json
├── docker-compose.yml
├── packages/shared/
└── apps/
    ├── backend/src/modules/
    │   ├── health/
    │   └── reviews/
    └── frontend/src/modules/
        └── reviews/
```

---

## 3. Architecture conventions

- **Fastify** bootstraps in `apps/backend/src/app.ts` with routes under `/api`.
- **Feature modules** follow `modules/<feature>/` with router, controller, service, and `internal/` for TypeORM entities.
- **Shared contracts** live in `packages/shared` and are imported via `@review-dash/shared/*`.
- **Frontend** reads data only through the REST API (`/api/reviews`), never directly from upstream sources on page load.
- **Review sync** is separated from display: `POST /api/reviews/sync` fetches and stores; `GET /api/reviews` serves the dashboard.

---

## 4. Environment variables

Copy examples before running:

```bash
cp apps/backend/.env.example apps/backend/.env.development
cp apps/frontend/.env.example apps/frontend/.env.development
```

Key backend variables: `DATABASE_*`, `FRONTEND_URL`, `REVIEW_PRODUCT_URLS`.

---

## 5. Dev workflow

```bash
docker compose up -d
pnpm install
pnpm --filter @review-dash/backend run mig:run
pnpm dev
```

Expected URLs:

- API health: `http://localhost:3000/api/health`
- Dashboard: `http://localhost:3001`

---

## 6. Extending the project

Recommended order:

1. Replace the mock upstream fetcher in `reviews.service.ts` with a real Amazon/review provider.
2. Add filtering/search on `GET /api/reviews` if needed.
3. Add scheduled sync or rating-trend charts as stretch goals.
4. Run `graphify update .` after structural code changes.

---

## 7. Agent rules

| File | Use when |
| --- | --- |
| `backend.mdc` | Fastify modules, TypeORM, migrations, API routes |
| `frontend.mdc` | Next.js pages, components, TanStack Query |
| `shared.mdc` | Zod schemas, shared types, env schema |
| `graphify.mdc` | Architecture exploration via `graphify-out/` |
