#!/bin/bash

if [[ ! -f "/var/bsxxu/db/bsxxu.db" ]]; then
  echo "/var/bsxxu/db/bsxxu.db not existed."
  exit 1
fi

exit 0
