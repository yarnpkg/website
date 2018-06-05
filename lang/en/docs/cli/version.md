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

You can even enabled or disable the git tagging behavior entirely by using
`version-git-tag`:

```sh
yarn config set version-git-tag true
```

If you would like to stop git commit hooks from running, you can disable them
using `version-commit-hooks`:

```sh
yarn config set version-commit-hooks false
```

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

##### `yarn version --no-git-tag-version` <a class="toc" id="toc-yarn-version-no-git-tag-version" href="#toc-yarn-version-no-git-tag-version"></a>

Creates a new version without creating a git tag.

##### `yarn version --no-commit-hooks` <a class="toc" id="toc-yarn-version-no-commit-hooks" href="#toc-yarn-version-no-commit-hooks"></a>

Bypasses running commit hooks when committing the new version.
