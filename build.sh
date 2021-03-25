#!/usr/bin/env bash

# input:
#   env:
#     WORLD_NAME

set -eu

cd "$(dirname "$0")" && (
  yarn build
  yarn landmarks $WORLD_NAME

  find public -name '.DS_Store' -print0 | xargs -0 rm -f
)
