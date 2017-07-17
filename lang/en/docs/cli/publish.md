---
id: docs_cli_publish
guide: docs_cli
layout: guide
---

<p class="lead">Publishes a package to the npm registry.</p>

Once a package is published, you can never modify that specific version, so
take care before publishing.

##### `yarn publish` <a class="toc" id="toc-yarn-publish" href="#toc-yarn-publish"></a>

Publishes the package defined by the `package.json` in the current directory.

##### `yarn publish [tarball]` <a class="toc" id="toc-yarn-publish-tarball" href="#toc-yarn-publish-tarball"></a>

Publishes the package defined by a `.tgz` gzipped tarball.

##### `yarn publish [folder]` <a class="toc" id="toc-yarn-publish-folder" href="#toc-yarn-publish-folder"></a>

Publishes the package contained in the specified folder.
`<folder>/package.json` should specify the package details.

##### `yarn publish --new-version <version>` <a class="toc" id="toc-yarn-publish-new-version" href="#toc-yarn-publish-new-version"></a>

Skips the prompt for new version by using the value of `version` instead.

##### `yarn publish --tag <tag>` <a class="toc" id="toc-yarn-publish-tag" href="#toc-yarn-publish-tag"></a>

Provided a tag to `yarn publish` lets you publish packages with a specific tag.
For example, if you do a `yarn publish --tag beta`, and your package is named
`blorp`, then someone else can install that package with `yarn add blorp@beta`.

##### `yarn publish --access <public|restricted>` <a class="toc" id="toc-yarn-publish-access" href="#toc-yarn-publish-access"></a>

The `--access` flag controls whether the npm registry publishes this package as 
a public package, or restricted.
