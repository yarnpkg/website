---
id: docs_cli_version
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Updates the package version.</p>

### Updating versions <a class="toc" id="toc-updating-versions" href="#toc-updating-versions"></a>

Using the `yarn version` command you can update the version of your package via
the command line.

For example, starting with this package.json `package.json`:

```js
{
  "name": "example-yarn-package",
  "version": "1.0.1",
  "description": "An example package to demonstrate Yarn"
}
```

When we run the `yarn version` command:

```sh
yarn version
```

```
info Current version: 1.0.1
question New version: 1.0.2
info New version: 1.0.2
✨  Done in 9.42s.
```

We will get this updated `package.json`:

```json
{
  "name": "example-yarn-package",
  "version": "1.0.2",
  "description": "An example package to demonstrate Yarn"
}
```

> **Note:** The new version you enter must be a valid
> [SemVer]({{url_base}}/docs/dependency-versions#toc-semantic-versioning)
> version.

#### Git tags <a class="toc" id="toc-git-tags" href="#toc-git-tags"></a>

If you run `yarn version` within a Git repository a
[Git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) will be created by
default following the format `v0.0.0`.

You can customize the git tag that is created or disable this behavior by using
`yarn config set`.

To change the prefix of the git tag you can use `version-tag-prefix`:

```sh
yarn config set version-tag-prefix "v"
```

Or you can change the git message using `version-git-message` where `%s` is the
version string:

```sh
yarn config set version-git-message "v%s"
```

You can also turn signing git tags on or off using `version-sign-git-tag`:

```sh
yarn config set version-sign-git-tag false
```

You can even enable or disable the git tagging behavior entirely by using
`version-git-tag`:

```sh
yarn config set version-git-tag true
```

If you would like to stop git commit hooks from running, you can disable them
using `version-commit-hooks`:

```sh
yarn config set version-commit-hooks false
```

#### Version lifecycle methods <a class="toc" id="toc-version-lifecycle" href="#toc-version-lifecycle"></a>

When the `yarn version` command is run it will also run the usual lifecycle methods in the following order:

- `yarn preversion`
- `yarn version`
- `yarn postversion`

In these scripts you also get some handy environment variables, e.g. `npm_package_version` will in the `preversion` script hold the version before the version change, and in the `postversion` script it will hold the version after the version change. 

This becomes useful when using yarn with git to publish new tags. Here is an example of what a package.json file could look like:

```json
{
  "name": "example-yarn-package",
  "version": "1.0.2",
  "description": "An example package to demonstrate Yarn",
  "scripts": {
    "test": "echo \"Running tests for version $npm_package_version...\"",
    "preversion": "yarn test",
    "postversion": "git push --tags && yarn publish . --tag $npm_package_version && git push && echo \"Successfully released version $npm_package_version!\""
  }
}
```

Running `yarn version` would look something like this:
```
info Current version: 1.0.2
Running tests for version 1.0.2...
✨  Done in 0.10s.
info New version: 2.0.0
...
To github.com:example-org/example-yarn-package.git
 * [new tag]             v2.0.0 -> v2.0.0
...
Successfully released version 2.0.0!
✨  Done in 2.72s.
```

After this both the remote repository should reflect the updated version and the package should be published under the same version.

### Commands <a class="toc" id="toc-commands" href="#toc-commands"></a>

##### `yarn version` <a class="toc" id="toc-yarn-version" href="#toc-yarn-version"></a>

Create a new version using an interactive session to prompt you for a new
version.

##### `yarn version --new-version <version>` <a class="toc" id="toc-yarn-version-new-version" href="#toc-yarn-version-new-version"></a>

Creates a new version specified by `<version>`.

##### `yarn version --major` <a class="toc" id="toc-yarn-version-major" href="#toc-yarn-version-major"></a>

##### `yarn version --minor` <a class="toc" id="toc-yarn-version-minor" href="#toc-yarn-version-minor"></a>

##### `yarn version --patch` <a class="toc" id="toc-yarn-version-patch" href="#toc-yarn-version-patch"></a>

Creates a new version by incrementing the major, minor, or patch number of the current version.

##### `yarn version --premajor` <a class="toc" id="toc-yarn-version-premajor" href="#toc-yarn-version-premajor"></a>

##### `yarn version --preminor` <a class="toc" id="toc-yarn-version-preminor" href="#toc-yarn-version-preminor"></a>

##### `yarn version --prepatch` <a class="toc" id="toc-yarn-version-prepatch" href="#toc-yarn-version-prepatch"></a>

Creates a new prerelease version by incrementing the major, minor, or patch number of the current version and adding a prerelease number.

##### `yarn version --prerelease` <a class="toc" id="toc-yarn-version-prerelease" href="#toc-yarn-version-prerelease"></a>

Increments the prerelease version number keeping the main version.

##### `yarn version [--premajor | --preminor | --prepatch | --prerelease] --preid <pre-identifier>` <a class="toc" id="toc-yarn-version-preid" href="#toc-yarn-version-preid"></a>

Adds an identifier specified by `<pre-identifier>` to be used to prefix premajor, preminor, prepatch or prerelease version increments.

##### `yarn version --no-git-tag-version` <a class="toc" id="toc-yarn-version-no-git-tag-version" href="#toc-yarn-version-no-git-tag-version"></a>

Creates a new version without creating a git tag.

##### `yarn version --no-commit-hooks` <a class="toc" id="toc-yarn-version-no-commit-hooks" href="#toc-yarn-version-no-commit-hooks"></a>

Bypasses running commit hooks when committing the new version.
