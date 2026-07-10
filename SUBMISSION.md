**Note: this file must be entirely hand-typed by you. Do not generate or edit it with any AI tool. Any SUBMISSION.md containing AI-generated content will be voided.**

# Assumptions

What assumptions did you make about the task, if any?

- based on the task description, I assumed the goal was to build a centralized review management dashboard where a company can view and manage reviews for its products.
- I assumed that reviews would need to be fetched using a scraper because Amazon does not provide a public API for accessing product reviews.
- Based on the task requirements and the sample product URL, I assumed the application should also manage products in the database, allowing users to add multiple products and fetch reviews for each of them.
- I also assumed the dashboard should support features such as infinite scrolling and filtering to efficiently browse large numbers of reviews.

# What you built

Explain what you built, your key decisions, and the trade-offs you made.

### Core

- **Monorepo** (`pnpm` + Turborepo): `apps/backend` (Fastify + TypeORM), `apps/frontend` (Next.js 15 App Router), `packages/shared` (Zod schemas, types, env validation).
- **PostgreSQL** with TypeORM migrations for `products` and `reviews` tables.
- **REST API**: `GET /api/reviews` (paginated), `POST /api/reviews/sync`, full products CRUD at `/api/products`.
- **Dashboard** reads from the API only — never hits Apify on page load.
- **Review sync** via Apify actor `junglee/amazon-reviews-scraper`: starts an actor run, polls until complete, fetches dataset items, maps to our schema, deduplicates by `reviewId`, bulk inserts new rows.
- **Dashboard UI**: review cards (rating, title, description, product name, link to Amazon), filters (product, rating, date range), infinite scroll (10 per page).

### Stretch goals implemented

1. **Refresh action** — "Refresh reviews" button calls `POST /api/reviews/sync` (rate-limited to 1 req / 2 min).
2. **Scheduled job** — cron via `toad-scheduler`, runs every `REVIEW_SYNC_CRON_INTERVAL_HOURS` (default 8h), gated by `ENABLE_CRON_JOBS=true`.
3. **Filtering** — by product, rating (1–5), and date range on the dashboard.
4. **Docker Compose** — PostgreSQL container with healthcheck.

### Key decisions & trade-offs

| Decision                              | Why                                                 | Trade-off                                     |
| ------------------------------------- | --------------------------------------------------- | --------------------------------------------- |
| Apify over direct scraping            | Reliable actor, handles Amazon anti-bot             | Costs Apify credits; adds external dependency |
| Products in DB vs env URLs            | Manageable via UI, soft-delete support              | Extra CRUD scope beyond minimum               |
| Sequential Apify calls per product    | Avoids parallel rate-limit issues                   | Slower when many products                     |
| 2-hour per-product cooldown           | Skips re-fetch if recently synced                   | May miss brand-new reviews within window      |
| `reviewId` dedup key                  | Stable across URL variants                          | Requires parsing ID from review URL           |
| Fastify instead of Next.js API routes | Separation of concerns, Swagger docs, rate limiting | Two servers to run in dev                     |

# Tools & tech stack

What tools and technologies did you use to build this?

- **Frontend:** Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Axios, sonner toasts
- **Backend:** Fastify, TypeORM, PostgreSQL, Zod, Axios (Apify API calls)
- **Shared:** Zod schemas for API validation + OpenAPI docs, shared TypeScript types
- **Infra:** Docker Compose (Postgres), pnpm workspaces, Turborepo
- **External:** Apify (`junglee/amazon-reviews-scraper` actor) for Amazon review scraping
- **Dev tools:** ESLint, TypeScript, tsx (dev server), Swagger UI (`/docs`)

# AI tools used

Which AI tools did you use, and for which parts of the work? what models did you use?

- **Cursor (Agent mode)** — primary development assistant throughout the project.
- Used for: scaffolding the monorepo pivot from a boilerplate repo, implementing backend modules (reviews, products), Apify integration, frontend dashboard/components, pagination, cron jobs, migrations, env schema, fixing build/lint errors, and git push.
- Models: Cursor's built-in agent (Auto routing across available models in the IDE).
- I reviewed, tested, and adjusted all generated code — especially API shapes, business rules (dedup, cooldown, rate limits), and env configuration.

# Representative prompts

Share 3–5 of your most useful prompts, and briefly explain what each one accomplished.

1. **"Pivot repo from Task Forge auth boilerplate to Review Dash — clean files, update rules/docs, make repo working"**
   - Established the project structure: removed auth stack, docker-compose, updated Cursor rules, eslint, prettier and README etc.

2. **"Implement Apify for Amazon review scraping — actor junglee/amazon-reviews-scraper, 10 reviews per product, dedupe by reviewUrl, rate limit sync to 1 req/2min"**
   - Built the full sync pipeline: `reviews.apify.ts`, env vars, service orchestration, and route-level rate limiting.

3. **"Convert reviews.apify.ts into Apify class; sync one product at a time in a loop with bulk insert per product"**
   - Refactored to match backend conventions and changed from parallel to sequential product sync with per-product insert.

# Catching AI mistakes

Where did AI get something wrong, and how did you catch and correct it?

1. **Wrong Apify API endpoint** — initially used `/v2/acts/.../run-sync-get-dataset-items` (legacy shortcut). Apify docs show the correct flow is `POST /v2/actors/{id}/runs` → poll run → fetch dataset items. Caught when sync failed; fixed after checking Apify API docs.

2. **Parallel Apify calls** — AI used `Promise.all` over all products, causing rate-limit issues. I requested sequential one-by-one sync with per-product bulk insert.

3. **Short Amazon URLs accepted** — form allowed `amzn.in/d/...` links that Apify can't scrape reliably. Added `amazonProductUrlSchema` requiring full `/dp/ASIN` URLs on both frontend and backend.

# AI reliance & cost (optional)

Roughly how heavily did you rely on AI? How many tokens did you spend? If you used the API directly and tracked token usage or cost, share it here.

- I mostly rely on AI for repetitive tasks, such as creating base modules for the frontend and backend with basic, need-based rule files. After that, I manually refactor and improve the code.
- The total token cost for building this project was $0 because my Cursor Pro plan expired but is somehow still working (LOL). Based on my estimate, I probably used around 1–2 million tokens. and I assume I used more tokens than I normally would because of the boilerplate setup required for this project
