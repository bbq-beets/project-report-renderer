#!/bin/sh

set -e

build_dir=/opt/build

# Copy the data to the build location.
cp -R $GITHUB_WORKSPACE/.reports $build_dir/.reports

# Only keep latest reports run.
if [[ -z "$INPUT_NOCOMMIT" ]]; then
  cd $GITHUB_WORKSPACE
  git -r rm ./docs
fi 

# Export back to the workspace output path.
cd $build_dir
npm run build
npm run export -- -o out

# Commit the changes.
cd $GITHUB_WORKSPACE

rsync -rtv $build_dir/out/ ${INPUT_OUTPUTPATH:-.}

if [[ -z "$INPUT_NOCOMMIT" ]]; then
  git config user.name github-actions
  git config user.email github-actions@github.com

  git add .
  git commit -m "Build from https://github.com/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
  git push
fi