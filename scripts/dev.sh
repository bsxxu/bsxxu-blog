#!/bin/bash

pnpm service:down && pnpm service:up

./scripts/service-check.sh

if [ $? -ne 0 ]; then
  echo "service check failed"
  exit 1
fi

pnpm cross-env MEILI_HOST=127.0.0.1 \
            BLOG_URL=http://localhost:3000 \
            REDIS_HOST=127.0.0.1 \
            next dev
