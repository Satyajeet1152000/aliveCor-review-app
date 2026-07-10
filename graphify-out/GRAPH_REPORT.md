# Graph Report - aliveCor-review-app  (2026-07-10)

## Corpus Check
- 114 files · ~37,163 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 625 nodes · 955 edges · 39 communities (28 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e5093585`
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
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 25 edges
2. `Product` - 20 edges
3. `compilerOptions` - 18 edges
4. `scripts` - 13 edges
5. `compilerOptions` - 13 edges
6. `paths` - 11 edges
7. `cn()` - 11 edges
8. `Review` - 11 edges
9. `CreateProductInput` - 10 edges
10. `The Review Dash` - 10 edges

## Surprising Connections (you probably didn't know these)
- `ProductCardProps` --references--> `Product`  [EXTRACTED]
  apps/frontend/src/modules/products/components/ProductCard.tsx → packages/shared/src/types/product.types.ts
- `ReviewCardProps` --references--> `Review`  [EXTRACTED]
  apps/frontend/src/modules/reviews/components/ReviewCard.tsx → packages/shared/src/types/review.types.ts
- `ReviewsFilterProps` --references--> `Product`  [EXTRACTED]
  apps/frontend/src/modules/reviews/components/ReviewsFilter.tsx → packages/shared/src/types/product.types.ts
- `ReviewsListProps` --references--> `Review`  [EXTRACTED]
  apps/frontend/src/modules/reviews/components/ReviewsList.tsx → packages/shared/src/types/review.types.ts
- `AppError` --references--> `LogType`  [EXTRACTED]
  apps/backend/src/lib/error-handler.ts → packages/shared/src/types/common-types.ts

## Import Cycles
- None detected.

## Communities (39 total, 11 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (28): SWAGGER_TAG_DISPLAY_ORDER, healthRouteConfig, healthRouter(), messageResponse(), successResponse(), ProductsController, productsRouteConfig, ReviewsController (+20 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (22): AppDataSource, baseConfig, DatabaseConfig, RequestContextModule, RequestContextStore, registerCompress, registerCors(), registerErrorHandler() (+14 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (26): ReviewCardProps, hasActiveFilters(), ReviewsDashboard(), ReviewsListProps, ReviewEntity, buildWhereClause(), endOfDay(), ReviewReader (+18 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (24): ReviewCard(), DEFAULT_FILTER_VALUES, ReviewsEmptyState(), ReviewsEmptyStateProps, ReviewsErrorState(), ReviewsErrorStateProps, ReviewFilterValues, ReviewsFilter() (+16 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (38): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (23): EMPTY_FORM, cn(), Avatar, AvatarFallback, AvatarImage, DialogContent, DialogDescription, DialogFooter() (+15 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (36): devDependencies, eslint, eslint-config-airbnb-base, eslint-config-airbnb-typescript, eslint-plugin-eslint-comments, eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks (+28 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (29): default, types, dependencies, fastify, zod, devDependencies, tsx, @types/node (+21 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (43): dependencies, fastify, @fastify/compress, @fastify/cors, @fastify/helmet, fastify-plugin, @fastify/rate-limit, @fastify/request-context (+35 more)

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
Cohesion: 0.15
Nodes (13): ProductCardProps, ProductFormDialogProps, ReviewsFilterProps, ProductEntity, ProductReader, ProductRepository, serializeProduct(), ProductWriter (+5 more)

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

### Community 36 - "Community 36"
Cohesion: 0.16
Nodes (12): AppError, AppErrorProps, SerializedException, getRequestId(), fastifyErrorCodesMap, ProductNotFoundError, ReviewSyncError, ApiErrorResponse (+4 more)

### Community 37 - "Community 37"
Cohesion: 0.25
Nodes (12): ProductCard(), ProductFormDialog(), ProductsPageContent(), createProduct(), deleteProduct(), getProducts(), updateProduct(), productsQueryKey (+4 more)

## Knowledge Gaps
- **311 isolated node(s):** `extends`, `name`, `version`, `private`, `node` (+306 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Product` connect `Community 12` to `Community 37`, `Community 3`, `Community 5`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 5` to `Community 3`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `Label` connect `Community 5` to `Community 3`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `extends`, `name`, `version` to the rest of the system?**
  _311 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07536231884057971 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07781649245063879 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08686868686868687 - nodes in this community are weakly interconnected._