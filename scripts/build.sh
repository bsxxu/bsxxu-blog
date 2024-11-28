#!/bin/bash
pnpm service:down &&
  ./scripts/pre-check.sh &&
  pnpm lint &&
  pnpm service:up &&
  ./scripts/service-check.sh &&
  pnpm cross-env MEILI_HOST=127.0.0.1 next build

pnpm service:down
