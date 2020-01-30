#!/usr/bin/env bash

set -eu

COMMIT_HASH_BEGIN=
CHANGED_REGIONS=$(mktemp)

(
  cd "$BACKUP_DIR"
  git config diff.renameLimit 2147483647
  COMMIT_HASH_BEGIN=$(git rev-parse HEAD)
  COMMIT_HASH_END=HEAD
  git pull --ff-only origin master
  git diff --name-only $COMMIT_HASH_BEGIN $COMMIT_HASH_END \
    | grep \.nbt\.z$ \
    | sed 's:\(.*\)/c[.]\([0-9-]*\)[.]\([0-9-]*\)[.]nbt[.]z:\1 \2 \3:g' \
    | awk 'function c2r(x) { if (x >= 0) { return int(x / 32) } else { return int(x / 32) - 1 } } {print $1, c2r($1), c2r($2)}' \
    | sort \
    | uniq \
    > $CHANGED_REGIONS
)

cd "$(dirname "$0")" && (

  yarn landmarks

  mkdir -p images/{o,n,e}

  function call_mca2png() {
    local expected_dir=$1
    local dimension=$2
    local dir=$3
    local rx=$4
    local rz=$5
    if [ "$dir" = "$expected_dir/chunk" ]; then
      ../mca2png/build/mca2png -w "$BACKUP_DIR/$expected_dir" -x $rx -z $rz -o images/$dimension -l ./landmarks.tsv -d $dimension
    fi
  }

  while read line; do
    call_mca2png world o $line
    call_mca2png world_nether/DIM-1 n $line
    call_mca2png world_the_end/DIM1 e $line
  done < $CHANGED_REGIONS

  rm -rf public/images/{o,n,e}
  mkdir -p public/images/{o,n,e}
  bash tool/imagemin.sh

  yarn imagelist
  yarn webpack

  find public -name '.DS_Store' -print0 | xargs -0 rm -f
)
