# Graph Report - aliveCor-review-app  (2026-07-10)

## Corpus Check
- 93 files · ~34,972 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 551 nodes · 728 edges · 36 communities (26 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c8f456db`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 25 edges
2. `compilerOptions` - 18 edges
3. `scripts` - 13 edges
4. `compilerOptions` - 13 edges
5. `paths` - 11 edges
6. `cn()` - 11 edges
7. `Review` - 11 edges
8. `The Review Dash` - 10 edges
9. `createServer()` - 9 edges
10. `scripts` - 9 edges

## Surprising Connections (you probably didn't know these)
- `ReviewCardProps` --references--> `Review`  [EXTRACTED]
  apps/frontend/src/modules/reviews/components/ReviewCard.tsx → packages/shared/src/types/review.types.ts
- `ReviewsListProps` --references--> `Review`  [EXTRACTED]
  apps/frontend/src/modules/reviews/components/ReviewsList.tsx → packages/shared/src/types/review.types.ts
- `AppError` --references--> `LogType`  [EXTRACTED]
  apps/backend/src/lib/error-handler.ts → packages/shared/src/types/common-types.ts
- `DialogHeader()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/components/ui/dialog.tsx → apps/frontend/src/lib/utils.ts
- `DialogFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/components/ui/dialog.tsx → apps/frontend/src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (36 total, 10 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (28): SWAGGER_TAG_DISPLAY_ORDER, healthRouteConfig, healthRouter(), successResponse(), AppError, AppErrorProps, SerializedException, getRequestId() (+20 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (22): AppDataSource, baseConfig, DatabaseConfig, RequestContextModule, RequestContextStore, registerCompress, registerCors(), registerErrorHandler() (+14 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (23): ReviewCardProps, ReviewsListProps, ReviewEntity, buildWhereClause(), endOfDay(), ReviewReader, ReviewRepository, serializeReview() (+15 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (23): ReviewCard(), DEFAULT_FILTER_VALUES, hasActiveFilters(), ReviewsDashboard(), ReviewsEmptyState(), ReviewsEmptyStateProps, ReviewsErrorState(), ReviewsErrorStateProps (+15 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (38): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (27): cn(), Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardDescription, CardFooter (+19 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (36): devDependencies, eslint, eslint-config-airbnb-base, eslint-config-airbnb-typescript, eslint-plugin-eslint-comments, eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks (+28 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (29): default, types, dependencies, fastify, zod, devDependencies, tsx, @types/node (+21 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (26): devDependencies, cross-env, pino-pretty, tsc-alias, tsx, @types/node, @types/pg, typescript (+18 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (26): devDependencies, autoprefixer, dotenv-cli, eslint, eslint-config-next, postcss, tailwindcss, @types/file-saver (+18 more)

### Community 10 - "Community 10"
Cohesion: 0.07
Nodes (27): dependencies, axios, class-variance-authority, clsx, file-saver, @hookform/resolvers, @iconify/react, lucide-react (+19 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (24): compilerOptions, allowJs, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+16 more)

### Community 12 - "Community 12"
Cohesion: 0.12
Nodes (17): dependencies, fastify, @fastify/compress, @fastify/cors, @fastify/helmet, fastify-plugin, @fastify/rate-limit, @fastify/request-context (+9 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (15): compilerOptions, composite, declaration, declarationMap, module, moduleResolution, outDir, resolveJsonModule (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (13): aliases, components, utils, rsc, $schema, style, tailwind, baseColor (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.15
Nodes (12): API endpoints, Backend (`apps/backend/.env.development`), Environment variables, First-time data load, Frontend (`apps/frontend/.env.development`), Notes, Prerequisites, Project layout (+4 more)

### Community 16 - "Community 16"
Cohesion: 0.22
Nodes (8): 1. Stack overview, 2. Directory layout, 3. Architecture conventions, 4. Environment variables, 5. Dev workflow, 6. Extending the project, 7. Agent rules, Review Dash — monorepo guide

### Community 17 - "Community 17"
Cohesion: 0.32
Nodes (4): metadata, Providers(), ProvidersProps, queryClient

### Community 18 - "Community 18"
Cohesion: 0.25
Nodes (7): AI reliance & cost (optional), AI tools used, Assumptions, Catching AI mistakes, Representative prompts, Tools & tech stack, What you built

### Community 19 - "Community 19"
Cohesion: 0.25
Nodes (7): Context, Core requirements, Stretch goals (optional, only if time allows), The Review Dash, The Task, Time Box, What to Submit

### Community 20 - "Community 20"
Cohesion: 0.40
Nodes (4): Local development, Module layout, Routes, @task-forge/frontend

### Community 21 - "Community 21"
Cohesion: 0.40
Nodes (4): Ground Rules, Rules & Evaluation, Submitting, What "Done" Looks Like

### Community 23 - "Community 23"
Cohesion: 0.67
Nodes (3): handle(), proxyRequest(), RouteContext

## Knowledge Gaps
- **310 isolated node(s):** `extends`, `name`, `version`, `private`, `node` (+305 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 5` to `Community 3`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `ReviewListFilters` connect `Community 2` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 10` to `Community 9`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `extends`, `name`, `version` to the rest of the system?**
  _310 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07239819004524888 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07781649245063879 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.10128205128205128 - nodes in this community are weakly interconnected._