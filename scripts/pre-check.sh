#!/bin/bash
pnpm service:down

FILES=("meilisearch.env" "nginx.conf" "web.env")

for FILE in "${FILES[@]}"; do
  if [[ ! -f "/var/bsxxu/config/$FILE" ]]; then
    echo "/var/bsxxu/config/$FILE not existed."
    exit 1
  fi
done
