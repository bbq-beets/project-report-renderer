#!/bin/sh

set -e

build_dir=/opt/build

if [[ ! -z "$INPUT_WORKINGBRANCH" ]]; then
  git fetch origin $INPUT_WORKINGBRANCH
  git checkout $INPUT_WORKINGBRANCH
fi

# Copy the data to the build location.
cp -R $GITHUB_WORKSPACE/.reports $build_dir/.reports

# Copy the Next.js cache to the build location
if [[ -d $GITHUB_WORKSPACE/.next ]]; then
  cp -R $GITHUB_WORKSPACE/.next $build_dir/.next
fi

# Export back to the workspace output path.
cd $build_dir
npm run build
npm run export -- -o out

if [[ -z "$INPUT_NOCOMMIT" ]]; then
  # Commit the changes.
  cd $GITHUB_WORKSPACE

  git config user.name github-actions
  git config user.email github-actions@github.com

  rsync -rtv $build_dir/out/ .

  git add .
  git commit -m "Generated build from workflow run: $GITHUB_RUN_ID"
  git push
fi