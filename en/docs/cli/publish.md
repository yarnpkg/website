---
id: docs_cli_publish
guide: docs_cli
layout: guide
---

<p class="lead">Publishes a package to the npm registry.</p>

Once a package is published, you can never modify that specific version, so take care before publishing.

##### `yarn publish` <a class="toc" id="toc-command-yarn-publish" href="#toc-command-yarn-publish"></a>

Publishes the package defined by the `package.json` in the current directory.

##### `yarn publish <tarball>` <a class="toc" id="toc-command-yarn-publish-tarball" href="#toc-command-yarn-publish-tarball"></a>

Publishes the package defined by a `.tgz` gzipped tarball.

##### `yarn publish <folder>` <a class="toc" id="toc-command-yarn-publish-folder" href="#toc-command-yarn-publish-folder"></a>

Publishes the package contained in the specified folder. `<folder>/package.json` should specify the package details.

##### `yarn publish --tag <tag>` <a class="toc" id="toc-command-yarn-publish-tag" href="#toc-command-yarn-publish-tag"></a>

Provided a tag to `yarn publish` lets you publish packages with a specific tag. For example, if you do a `yarn publish --tag beta`, and your package is named `blorp`, then someone else can install that package with `yarn add blorp@beta`.

##### `yarn publish --access <public|restricted>` <a class="toc" id="toc-command-yarn-publish-access" href="#toc-command-yarn-publish-access"></a>

The `--access` flag controls whether the npm registry publishes this package as a public package, or restricted.
