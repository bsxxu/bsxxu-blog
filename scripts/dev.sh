#!/bin/bash

pnpm service:down && pnpm service:up

./scripts/service-check.sh

if [ $? -ne 0 ]; then
  echo "service check failed"
  exit 1
fi

cross-env MEILI_HOST=http://localhost:7700 next dev
