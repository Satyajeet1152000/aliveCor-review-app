# @review-dash/frontend

Next.js web application for Review Dash. Displays the latest product reviews from the REST API.

## Routes

| Route | Description |
| --- | --- |
| `/` | Reviews dashboard (latest 20, newest first) |

## Local development

```bash
cp .env.example .env.development
pnpm --filter @review-dash/frontend dev
```

## Module layout

```text
src/modules/reviews/
  reviews.api.ts
  reviews.queries.ts
  components/
    ReviewCard.tsx
    ReviewsDashboard.tsx
```

Import shared types from `@review-dash/shared/types`.
