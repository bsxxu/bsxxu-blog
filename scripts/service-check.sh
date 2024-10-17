#!/bin/bash

function check() {
  local func_name="$1"
  local attempt=1
  while ((attempt <= 5)); do
    if ! $func_name; then
      echo "retry $2..."
      sleep 1
      ((attempt++))
    else
      echo "$2 OK"
      return 0
    fi
  done
  echo "$2 failed"
  exit 1
}

function check_meilisearch() {
  local resp=$(curl --silent -X GET "http://localhost:7700/health")
  if echo "$resp" | grep -q '"status":"available"'; then
    return 0
  fi
  return 1
}

check check_meilisearch meilisearch
exit 0
