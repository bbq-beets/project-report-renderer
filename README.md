# Project Report Renderer

This action builds project reports to static HTML, JavaScript, and CSS.

## Use

```yaml
steps:
  # After generating reports
  - name: Render reports
    uses: bbq-beets/project-report-renderer@v1
```

See [action.yml](/action.yml) for a description of the inputs that can be
provided to this action.

## Development

After cloning the repository, copy a report directory to `./.reports`, and
then run `./test.sh`. This script builds the container and runs it in a
similar fashion to the action itself.

If you want to run the Next.js server without Docker (after copying a report
directory), you can install this project's npm dependencies and run it:

```shell
> npm install
> INPUT_REPORTSPATH=.reports npx next
```

The site will be served from a prefix, so navigate to
`http://localhost:3000/project-report-renderer`.

## How it Works

When this action runs in a repository where project reports have been
generated, it uses that data in order to build the static site defined in
this action's [/pages](/pages) directory using [Next.js](https://nextjs.org).

See [entrypoint.sh](/entrypoint.sh) for a detailed overview, but it basically
copies report data into a temporary build directory, then copies the final
static site output back to the workflow working directory and pushes it to
the repository.

## Licenses

- Icons in components/icons are from [heroicons](https://heroicons.com/), licensed under [MIT](/heroicons-license.md).
