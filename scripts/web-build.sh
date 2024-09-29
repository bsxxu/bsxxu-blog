#!/bin/bash

if [ ! -f ../server/dist/main.cjs ]; then
  echo "build server first"
  exit 1
fi

server_resp=$(curl --silent -X GET "http://localhost:8080/bsxxu")

if ! echo "$server_resp" | grep -q "success"; then
  echo 'starting server'
  node --env-file ../server/.env ../server/dist/main.cjs &
  server_pid=$!
  trap "kill $server_pid" EXIT
  sleep 1
  server_resp=$(curl --silent -X GET "http://localhost:8080/bsxxu")
  if ! echo "$server_resp" | grep -q "success"; then
    echo 'server run failed'
    exit 1
  fi
fi

pnpm cross-env NODE_ENV=production next build
