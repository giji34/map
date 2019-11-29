#!/bin/bash

aws s3 sync public s3://map.giji34.world --profile giji34 --exact-timestamps --delete --cache-control 'max-age=86400' --exclude "*.js.map"
