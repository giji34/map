#!/usr/bin/env bash

set -eu

COMMIT_HASH_BEGIN=
CHANGED_REGIONS=$(mktemp)
if type nproc 2>&1 >/dev/null; then
  NPROC=$(nproc)
else
  NPROC=$(getconf _NPROCESSORS_ONLN)
fi

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

  ARGFILE=$(mktemp)
  for spec in world=o world_nether/DIM-1=n world_the_end/DIM1=e; do
    WORLD=$(echo $spec | cut -f1 -d=)
    DIMENSION=$(echo $spec | cut -f2 -d=)
    cat "$CHANGED_REGIONS" \
      | grep "$WORLD/chunk" \
      | awk "{print \"-w $BACKUP_DIR/$WORLD\", \"-x\", \$2, \"-z\", \$3, \"-o images/$DIMENSION\", \"-l ./landmarks.tsv\", \"-d $DIMENSION\"""}" \
      >> $ARGFILE
  done
  cat "$ARGFILE" | xargs -L 1 -P $NPROC ../mca2png/build/mca2png
  rm -f "$ARGFILE"

  rm -rf public/images/{o,n,e}
  mkdir -p public/images/{o,n,e}
  bash tool/imagemin.sh

  yarn imagelist
  yarn webpack

  find public -name '.DS_Store' -print0 | xargs -0 rm -f
)
