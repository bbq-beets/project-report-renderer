#!/usr/bin/env bash

set -ev

tag=bbq-beets/project-report-renderer
workdir=/home/github

docker build . -t $tag

docker run \
  -e INPUT_REPORTS_PATH=./.reports \
  -e GITHUB_WORKSPACE=$workdir \
  -w=$workdir \
  --mount type=bind,src=$(pwd),dst=$workdir \
  --rm -it $tag