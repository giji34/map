#!/usr/bin/env bash

set -eu

(cd "$BACKUP_DIR" && git pull --ff-only origin master)

yarn landmarks

rm -rf images/0
mkdir -p images/0
../mca2png/build/mca2png -w "$BACKUP_DIR/world" -o images/0 -l ./landmarks.tsv

rm -rf public/images/0
mkdir -p public/images/0
yarn imagemin

yarn imagelist
yarn webpack

find public -name '.DS_Store' | xargs rm