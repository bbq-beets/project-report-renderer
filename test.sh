#!/usr/bin/env bash

set -e

tag=bbq-beets/project-report-renderer
workdir=/home/github

docker build . -t $tag

docker run \
  -e INPUT_WORKINGBRANCH=gh-pages \
  -e GITHUB_REPOSITORY=bbq-beets/project-report-renderer \
  -e GITHUB_RUN_ID=test.sh \
  -e GITHUB_WORKSPACE=$workdir \
  -w=$workdir \
  --mount type=bind,src=$(pwd),dst=$workdir \
  --rm -it $tag