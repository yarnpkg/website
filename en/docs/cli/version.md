---
id: docs_cli_version
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Updates the package version.</p>

##### `yarn version` <a class="toc" id="toc-yarn-version" href="#toc-yarn-version"></a>

Starts an interactive session to update the version. Once complete,
`package.json` contains the new version information:

Initial `package.json`:

```js
{
  "name": "example-yarn-package",
  "version": "1.0.1",
  "description": "An example package to demonstrate Yarn",
```

Example run:

```sh
$ yarn version
```

```
info Current version: 1.0.1
question New version: 1.0.2
info New version: 1.0.2
✨  Done in 9.42s.
```

Updated `package.json`:

```js
{
  "name": "example-yarn-package",
  "version": "1.0.2",
  "description": "An example package to demonstrate Yarn",
```

**Note:** The new version you enter must be a valid semver string.

##### `yarn version --new-version <version>` <a class="toc" id="toc-yarn-version-new-version" href="#toc-yarn-version-new-version"></a>

Updates the package to the specified version.

Example:

```sh
$ yarn version --new-version 1.0.3
```

```
info Current version: 1.0.2
info New version: 1.0.3
✨  Done in 0.09s.
```

If `yarn version --new-version <version>` is run in a Git repo, by default a
new annotated Git tag will be created. The default git message will be "v". Ex:
"v1.0.3". To change the defaults for the git-related actions of creating a new
versions, you can change the defaults of the following configuration default
values with `yarn config set <key> value:

```js
// String to prefix git versions with
'version-tag-prefix': 'v'

// Whether to create git tags by default
'version-git-tag': true

// Whether to sign git tags by default
'version-git-sign': false

// Default git message, where %s is the version string
'version-git-message': 'v%s'
```

##### `yarn version --new-version --no-git-tag-version <version>` <a class="toc" id="toc-yarn-version-new-version-no-git" href="#toc-yarn-version-new-version-no-git"></a>

Works the same as `yarn version --new-version <version>`, but does not create a
new git tag.

To disable this behavior by default you can use
[`yarn config`]({{url_base}}/docs/cli/config):

```sh
yarn config set version-git-tag false
```
