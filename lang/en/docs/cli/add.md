---
id: docs_cli_add
guide: docs_cli
layout: guide
description: docs_cli_add_description
additional_reading_tags: ["dependencies"]
---

{% include vars.html %}

<p class="lead">Installs a package and any packages that it depends on.</p>

### Adding dependencies <a class="toc" id="toc-adding-dependencies" href="#toc-adding-dependencies"></a>

When you want to use another package, you first need to add it to your
dependencies. This means running `yarn add [package-name]` to install it into
your project.

This will also update your `package.json` and your `yarn.lock` so that other
developers working on the project will get the same dependencies as you when
they run `yarn` or `yarn install`.

Most packages will be installed from the [npm registry](https://www.npmjs.com/)
and referred to by simply their package name. For example, `yarn add react`
will install the [`react`](https://www.npmjs.com/package/react) package from
the npm registry.

You can specify versions using one of these:

1. `yarn add package-name` installs the "latest" version of the package.
2. `yarn add package-name@1.2.3` installs a specific version of a package from
  the registry.
3. `yarn add package-name@tag` installs a specific
  ["tag"]({{url_base}}/docs/cli/tag) (e.g. `beta`, `next`, or `latest`).

In general, a package is simply a folder with code and a `package.json` file
that describes the contents. You can refer to a package a number of different
ways:

You can also specify packages from different locations:

1. `yarn add package-name` installs the package from the
  [npm registry](https://www.npmjs.com/) unless you have specified another one
  in your `package.json`.
2. `yarn add file:/path/to/local/folder` installs a package that is on your
  local file system. This is useful to test out other packages of yours that
  haven't been published to the registry.
3. `yarn add file:/path/to/local/tarball.tgz` installs a package from a gzipped
  tarball which could be used to share a package before publishing it.
4. `yarn add <git remote url>` installs a package from a remote git repository.
5. `yarn add <git remote url>#<commit/tag>` installs a package from a remote git repository at specific git commit or git tag.
6. `yarn add https://my-project.org/package.tgz` installs a package from a
  remote gzipped tarball.

### Caveats <a class="toc" id="toc-caveats" href="#toc-caveats"></a>

Yarn does not support private scoped packages at this time.

If you have used a package manager like npm previously, you may be looking for
how to add global dependencies.

For the vast majority of packages it is considered a bad practice to have
global dependencies because they are implicit. It is much better to add
all of your dependencies locally so that they are explicit and anyone else
using your project gets the same set of dependencies.

If you are trying to use a CLI tool that has a `bin` you can access these in
your `./node_modules/.bin` directory. You can also use the
[`global`]({{url_base}}/docs/cli/global) command:

```sh
yarn global add <package...>
```

### Commands <a class="toc" id="toc-commands" href="#toc-commands"></a>

##### `yarn add <package...>` <a class="toc" id="toc-yarn-add" href="#toc-yarn-add"></a>

This will install one or more packages in your
[`dependencies`]({{url_base}}/docs/dependency-types#toc-dependencies).

##### `yarn add <package...> [--dev/-D]` <a class="toc" id="toc-yarn-add-dev-d" href="#toc-yarn-add-dev-d"></a>

Using `--dev` or `-D` will install one or more packages in your
[`devDependencies`]({{url_base}}/docs/dependency-types#toc-dev-dependencies).

##### `yarn add <package...> [--peer/-P]` <a class="toc" id="toc-yarn-add-peer-p" href="#toc-yarn-add-peer-p"></a>

Using `--peer` or `-P` will install one or more packages in your
[`peerDependencies`]({{url_base}}/docs/dependency-types#toc-peer-dependencies).

##### `yarn add <package...> [--optional/-O]` <a class="toc" id="toc-yarn-add-optional-o" href="#toc-yarn-add-optional-o"></a>

Using `--optional` or `-O` will install one or more packages in your
[`optionalDependencies`]({{url_base}}/docs/dependency-types#toc-optional-dependencies).

##### `yarn add <package...> [--exact/-E]` <a class="toc" id="toc-yarn-add-exact-e" href="#toc-yarn-add-exact-e"></a>

Using `--exact` or `-E` installs the packages as exact versions. The default is
to use the most recent release with the same major version. For example,
`yarn add foo@1.2.3` would accept version `1.9.1`, but
`yarn add foo@1.2.3 --exact` would only accept version `1.2.3`.

##### `yarn add <package...> [--tilde/-T]` <a class="toc" id="toc-yarn-add-tilde-t" href="#toc-yarn-add-tilde-t"></a>

Using `--tilde` or `-T` installs the most recent release of the packages that
have the same minor version. The default is to use the most recent release with
the same major version. For example, `yarn add foo@1.2.3 --tilde` would accept
`1.2.9` but not `1.3.0`.
