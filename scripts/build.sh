#!/bin/bash
pnpm service:down &&
  ./scripts/pre-check.sh &&
  pnpm lint &&
  pnpm service:up &&
  ./scripts/service-check.sh &&
  pnpm cross-env MEILI_HOST=http://localhost:7700 next build

pnpm service:down
