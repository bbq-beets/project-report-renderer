# Project Report Renderer

This action builds project reports to static HTML, JavaScript, and CSS.

## Development

After cloning the repository, copy a report directory to `./.reports`, and
then run `./test.sh`. This script builds the container and runs it in a
similar fashion to the action itself.

## How it Works

When this action runs in a repository where project reports have been
generated, it uses that data in order to build the static site defined in
this action's [/pages](/pages) directory using [Next.js](https://nextjs.org).
