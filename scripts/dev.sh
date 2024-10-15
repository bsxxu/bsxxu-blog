#!/bin/bash

docker-compose -f ./compose.dev.yaml up -d --remove-orphans

./scripts/service-check.sh

if [ $? -ne 0 ]; then
  echo "service check failed"
  exit 1
fi

next dev
