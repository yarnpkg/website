---
id: docs_cli_install
guide: docs_cli
layout: guide
---

{% include vars.html %}

`yarn install` is used to install all dependencies for a project. This is most
commonly used when you have just checked out code for a project, or when
another developer on the project has added a new dependency that you need to
pick up.

If you are used to using npm you might be expecting to use `--save` or
`--save-dev`. These have been replaced by `yarn add` and `yarn add --dev`. For
more information, see
[the `yarn add` documentation]({{url_base}}/docs/cli/add).

Running `yarn` with no command will run `yarn install`, passing through any provided flags.

If you need reproducible dependencies, which is usually the case with the continuous integration systems, you should pass `--frozen-lockfile` flag.

##### `yarn install` <a class="toc" id="toc-yarn-install" href="#toc-yarn-install"></a>

Install all the dependencies listed within `package.json` in the local
`node_modules` folder.

##### `yarn install --check-files` <a class="toc" id="toc-yarn-install-check-files" href="#toc-yarn-install-check-files"></a>

Verifies that already installed files in `node_modules` did not get removed.

##### `yarn install --flat` <a class="toc" id="toc-yarn-install-flat" href="#toc-yarn-install-flat"></a>

Install all the dependencies, but only allow one version for each package. On the first run this will prompt you to
choose a single version for each package that is depended on at multiple
version ranges. These will be added to your `package.json` under a
`resolutions` field.

```json
"resolutions": {
  "package-a": "2.0.0",
  "package-b": "5.0.0",
  "package-c": "1.5.2"
}
```

##### `yarn install --force` <a class="toc" id="toc-yarn-install-force" href="#toc-yarn-install-force"></a>

This refetches all packages, even ones that were previously installed.

##### `yarn install --har` <a class="toc" id="toc-yarn-install-har" href="#toc-yarn-install-har"></a>

Outputs an [HTTP archive](https://en.wikipedia.org/wiki/.har) from all the
network requests performed during the installation. HAR files are commonly used
to investigate network performance, and can be analyzed with tools such as
[Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/) or
[HAR Viewer](http://www.softwareishard.com/blog/har-viewer/).

##### `yarn install --ignore-scripts` <a class="toc" id="toc-yarn-install-ignore-scripts" href="#toc-yarn-install-ignore-scripts"></a>

Do not execute any scripts defined in the project package.json and its dependencies.

##### `yarn install --modules-folder <path>` <a class="toc" id="toc-yarn-install-modules-folder" href="#toc-yarn-install-modules-folder"></a>

Specifies an alternate location for the `node_modules` directory, instead of the default `./node_modules`.

##### `yarn install --no-lockfile` <a class="toc" id="toc-yarn-install-no-lockfile" href="#toc-yarn-install-no-lockfile"></a>

Don't read or generate a `yarn.lock` lockfile.

##### `yarn install --production[=true|false]` <a class="toc" id="toc-yarn-install-production-true-false" href="#toc-yarn-install-production-true-false"></a>

Yarn will not install any package listed in `devDependencies` if the `NODE_ENV` environment variable is set to `production`. Use this flag to instruct Yarn to ignore `NODE_ENV` and take its production-or-not status from this flag instead.

> **Notes:** `--production` is the same as `--production=true`. `--prod` is an alias of `--production`.

##### `yarn install --pure-lockfile` <a class="toc" id="toc-yarn-install-pure-lockfile" href="#toc-yarn-install-pure-lockfile"></a>

Don't generate a `yarn.lock` lockfile.

##### `yarn install --frozen-lockfile` <a class="toc" id="toc-yarn-install-frozen-lockfile" href="#toc-yarn-install-frozen-lockfile"></a>

Don't generate a `yarn.lock` lockfile and fail if an update is needed.

##### `yarn install --silent` <a class="toc" id="toc-yarn-install-silent" href="#toc-yarn-install-silent"></a>

Run yarn install without printing installation log

##### `yarn install --ignore-engines` <a class="toc" id="toc-yarn-install-ignore-engines" href="#toc-yarn-install-ignore-engines"></a>

Ignore engines check.

##### `yarn install --ignore-optional` <a class="toc" id="toc-yarn-install-ignore-optional" href="#toc-yarn-install-ignore-optional"></a>

Don't install optional dependencies.

##### `yarn install --offline` <a class="toc" id="toc-yarn-install-offline" href="#toc-yarn-install-offline"></a>

Run yarn install in offline mode.

##### `yarn install --non-interactive` <a class="toc" id="toc-yarn-install-non-interactive" href="#toc-yarn-install-non-interactive"></a>

Disable interactive prompts, like when there's an invalid version of a dependency.

##### `yarn install --update-checksums` <a class="toc" id="toc-yarn-install-update-checksums" href="#toc-yarn-install-update-checksums"></a>

Update checksums in the `yarn.lock` lockfile if there's a mismatch between them and their package's checksum.
