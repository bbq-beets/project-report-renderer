#!/bin/sh

set -e

build_dir=/opt/build

# Copy the reports from the working directory to our build location.
cp -R $INPUT_REPORTSPATH $build_dir/.reports
# Move the outputs path to the build location so we can use the cached build.
mv $GITHUB_WORKSPACE/$INPUT_OUTPUTSPATH $build_dir

# Export back to the workspace output path.
cd $build_dir
npm run build
npm run export -- -o $GITHUB_WORKSPACE/$INPUT_OUTPUTSPATH

if [[ -z "$INPUT_NOCOMMIT" ]]; then
  if [[ -z "$INPUT_GITHUBTOKEN" ]]; then
    echo "No githubToken input provided, can't request page build."
    exit 1
  fi

  # Commit the changes.
  cd $GITHUB_WORKSPACE
  git config user.name github-actions
  git config user.email github-actions@github.com
  git add $INPUT_OUTPUTSPATH
  git commit -m "Generated build from workflow run: $GITHUB_RUN_ID"
  git push

  # Request a GitHub Pages build.
  http_code=$(curl -s -w "%{http_code}" -o /tmp/curl-out.html -X POST \
    https://api.github.com/repos/$GITHUB_REPOSITORY/pages/builds \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: Bearer $INPUT_GITHUBTOKEN" \
    -H "User-Agent: bbq-beets/project-report-renderer")
  
  if [[ ! "$http_code" == "201" ]]; then
    echo "Expected 201, got $http_code from build request. Output:"
    cat /tmp/curl-out.html
    exit 1
  fi
fi