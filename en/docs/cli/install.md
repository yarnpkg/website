---
id: docs_cli_install
guide: docs_cli
layout: guide
---

<p class="lead">Install a packages and any packages that it depends on.</p>

### What is a package?

A package is simply a folder with code and a `package.json` that describes the
contents. You can install a package a number of different ways:

1. `<package-name>@<package-version>` which resolves to a url in the npm
  registry of a gzipped tarball of the package at a specific version.
2. `<package-name>@<dist-tag>` same as before, only using a dist-tag which is a
  labeled version of the package (i.e. "latest" or "beta").
3. `<package-name>` which defaults to a `dist-tag` of "latest"
4. A `<git-remote-url>` of the package.

### Adding dependencies

If you are used to using npm you might be expecting to use `--save` or
`--save-dev`. These have been replaced by `yarn add` and `yarn add --dev`. For
info on adding dependencies to your project, see the `yarn add` documentation.

### Install algorithm

> ***TODO***

### Commands

##### `yarn install`

Install all the dependencies listed within `package.json` in the local
`node_modules` folder.

##### `yarn install --flat`

Only allow one version of a package. On the first run this will prompt you to
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

##### `yarn install --force`

This refetches all packages, even ones that were previously installed.

##### `yarn install --no-lockfile`

Don't read or generate a `yarn.lock` lockfile.

##### `yarn install --production`

Using the `--production` flag, or when the `NODE_ENV` environment variable is
set to `production`, Yarn will not install any package listed in
`devDependencies`.

> **Note:** `--prod` is also an alias of `--production`.

##### `yarn install --pure-lockfile`

Don't generate a `yarn.lock` lockfile.
