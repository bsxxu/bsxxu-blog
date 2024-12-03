#!/bin/bash

if [[ ! -f "/var/aiduorin/db/aiduorin.db" ]]; then
  echo "/var/aiduorin/db/aiduorin.db not existed."
  exit 1
fi

exit 0
