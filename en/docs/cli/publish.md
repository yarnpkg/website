---
id: docs_cli_publish
guide: docs_cli
layout: guide
---

<p class="lead">Publishes a package to the npm registry.</p>

Once a package is published, you can never modify that specific version, even if it is unpublished, so take care before publishing.

##### `yarn publish`

Publishes the package defined by the `package.json` in the current directory.

##### `yarn publish <tarball>`

Publishes the package defined by a `.tgz` gzipped tarball.

##### `yarn publish <folder>`

Publishes the package contained in the specified folder. `<folder>/package.json` should specify the package details.

##### `yarn publish --tag <tag>`

Provided a tag to `yarn publish` lets you publish packages with a specific tag. For example, if you do a `yarn publish --tag beta`, and your package is named `blorp`, then someone else can install that package with `yarn add blorp@beta`.

##### `yarn publish --access <public|restricted>`

The `--access` flag controls whether the npm registry publishes this package as a public package, or restricted.
