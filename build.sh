#!/usr/bin/env bash

set -eu

(cd "$BACKUP_DIR" && git pull --ff-only origin master)

yarn landmarks

rm -rf images/{o,n,e}
mkdir -p images/{o,n,e}
../mca2png/build/mca2png -w "$BACKUP_DIR/world"              -o images/o -l ./landmarks.tsv -d o
../mca2png/build/mca2png -w "$BACKUP_DIR/world_nether/DIM-1" -o images/n -l ./landmarks.tsv -d n
../mca2png/build/mca2png -w "$BACKUP_DIR/world_the_end/DIM1" -o images/e -l ./landmarks.tsv -d e

rm -rf public/images/{o,n,e}
mkdir -p public/images/{o,n,e}
bash tool/imagemin.sh

yarn imagelist
yarn webpack

find public -name '.DS_Store' | xargs rm
