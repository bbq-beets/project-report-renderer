#!/usr/bin/env bash

set -ev

tag=bbq-beets/project-report-renderer
workdir=/home/github

docker build . -t $tag

docker run \
  -e INPUT_REPORTS_PATH=./.reports \
  -e INPUT_OUTPUTS_PATH=./docs \
  -e GITHUB_WORKSPACE=$workdir \
  -e GITHUB_RUN_ID=test \
  -w=$workdir \
  --mount type=bind,src=$(pwd),dst=$workdir \
  --rm -it $tag