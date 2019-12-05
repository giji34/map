#!/bin/bash

aws s3 sync public/images s3://map.giji34.world/images --profile giji34 --exact-timestamps --delete --cache-control 'max-age=900'
aws s3 sync public s3://map.giji34.world --profile giji34 --exact-timestamps --delete --cache-control 'no-store' --exclude "*.js.map" --exclude "images"
