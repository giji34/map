#!/usr/bin/env bash

set -eu

yarn landmarks

rm -rf images/0
(cd "$BACKUP_DIR" && git pull --ff-only origin master)
mkdir -p images/0
../mca2png/build/mca2png -w "$BACKUP_DIR/world" -o images/0 -l ./landmarks.tsv
rm -rf public/images/0
mkdir -p public/images/0

yarn imagemin
yarn imagelist
yarn webpack
