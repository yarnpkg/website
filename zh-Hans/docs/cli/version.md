---
id: docs_cli_version
guide: docs_cli
layout: guide
---

<p class="lead">Updates the package version.</p>

##### `yarn version` <a class="toc" id="toc-yarn-version" href="#toc-yarn-version"></a>

Starts an interactive session to update the version. Once complete, `package.json` contains the new version information:

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
info Current version: 1.0.2
info New version: 1.0.3
✨  Done in 0.09s.
```
