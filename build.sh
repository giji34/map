#!/usr/bin/env bash

# input:
#   env:
#     BACKUP_DIR
#     WORLD_NAME

set -eu

CHANGED_REGIONS=$(mktemp)
if type nproc 2>&1 >/dev/null; then
  NPROC=$(nproc)
else
  NPROC=$(getconf _NPROCESSORS_ONLN)
fi

(
  cd "$BACKUP_DIR"
  (
    if [ "$1" = "all" ]; then
      find world world_nether/DIM-1 world_the_end/DIM1 -name '*\.nbt\.z'
    else
      REV_BEGIN=$(hg log --template '{rev}' --limit 1)
      hg pull
      hg update
      REV_END=$(hg log --template '{rev}' --limit 1)
      hg status --rev $REV_BEGIN:$REV_END --template '{path}\n' \
        | grep \.nbt\.z$
    fi
  ) | sed 's:\(.*\)/c[.]\([0-9-]*\)[.]\([0-9-]*\)[.]nbt[.]z:\1 \2 \3:g' \
    | awk 'function c2r(x) { if (x >= 0) { return int(x / 32) } else { return int(x / 32) - 1 } } {print $1, c2r($2), c2r($3)}' \
    | sort \
    | uniq \
    > $CHANGED_REGIONS
)

cd "$(dirname "$0")" && (

  yarn landmarks $WORLD_NAME

  if [ "$1" = "all" ]; then
    rm -rf public/images/$WORLD_NAME/{o,n,e}
  fi
  mkdir -p public/images/$WORLD_NAME/{o,n,e}

  ARGFILE=$(mktemp)
  for spec in world=o world_nether/DIM-1=n world_the_end/DIM1=e; do
    WORLD=$(echo $spec | cut -f1 -d=)
    DIMENSION=$(echo $spec | cut -f2 -d=)
    cat "$CHANGED_REGIONS" \
      | grep "$WORLD/chunk" \
      | awk "{print \"-w $BACKUP_DIR/$WORLD\", \"-x\", \$2, \"-z\", \$3, \"-o public/images/$WORLD_NAME/$DIMENSION\", \"-l ./landmarks.tsv\", \"-d $DIMENSION\"""}" \
      >> $ARGFILE
  done
  cat "$ARGFILE" | xargs -L 1 -P $NPROC ../mca2png/build/mca2png
  rm -f "$ARGFILE"

  yarn imagelist $WORLD_NAME

  find public -name '.DS_Store' -print0 | xargs -0 rm -f
)
