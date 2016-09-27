---
id: docs_cli_add
guide: docs_cli
layout: guide
---

<p class="lead">Installs a package and any packages that it depends on.</p>

### Adding dependencies

When you want to use another package, you first need to add it to your
dependencies. This means running `yarn add [package-name]` to install it into
your project.

This will also update your `package.json` and your `yarn.lock` so that other
developers working on the project will get the same dependencies as you when
they run `yarn install`.

Most packages will be installed from the [npm registry](https://www.npmjs.com/)
and referred to by simply their package name. For example, `yarn add react`
will install the [`react`](https://www.npmjs.com/package/react) package from
the npm registry.

You can specify versions using one of these:

1. `yarn add package-name` installs the "latest" version of the package.
2. `yarn add package-name@1.2.3` installs a specific version of a package from
  the registry.
3. `yarn add package-name@dist-tag` installs a specific ["dist-tag"](dist-tag)
  (i.e. `beta`, `next`, or `latest`).

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
5. `yarn add https://my-project.org/package.tgz` installs a package from a
  remote gzipped tarball.

### Different types of dependencies

Dependencies serve many different purposes. Some dependencies are needed to
build your project, others are needed when your running your program. As such
there are a number of different types of dependencies that you can have (i.e.
`dependencies`, `devDependencies`, or `peerDependencies`).

Your `package.json` will contain all of these dependencies:

```json
{
  "name": "my-project",
  "dependencies": {
    "package-a": "^1.0.0"
  },
  "devDepdencies": {
    "package-b": "^1.2.1"
  },
  "peerDependencies": {
    "package-c": "^2.5.4"
  },
  "optionalDependencies": {
    "package-d": "^3.1.0"
  }
}
```

Most people only have `dependencies` and `devDependencies`, but each of these
are important to understand.

##### `dependencies`

These are your normal dependencies, or rather ones that you need when running
your code (i.e. React or ImmutableJS).

##### `devDependencies`

These are your development dependencies. Dependencies that you need at some
point in the development workflow but not while running your code (i.e. Babel
or Flow).

##### `peerDependencies`

Peer dependencies are a special type of dependency that would only ever come up
if you were publishing your own package.

Having a peer dependency means that your package needs a dependency that is the
same exact dependency as the person installing your package. This is useful for
packages like `react` that need to have a single copy of `react-dom` that is
also used by the person installing it.

##### `optionalDependencies`

Optional dependencies are just that: optional. If they fail to install, Yarn
will still say the install process was successful.

This is useful for dependencies that won't necessarily work on every machine
and you have a fallback plan in case they are not installed (i.e. Watchman).

### Dependency versions

Packages in Yarn follow [Semantic Versioning](http://semver.org/) or "semver".
When you install a new package from the registry it will be added to your
`package.json` with a semver version range like this:

```json
{
  "dependencies": {
    "package-name": "^1.0.3"
  }
}
```

Notice the `^` in the `^1.0.3`, this is a way of specifying "compatible"
versions to be installed. The `^` operator means "anything greater than or
equal to `1.0.3`, but less than `2.0.0`".

By default when you run `yarn add [package-name]` it will use the caret (`^`)
version. But you could also modify this to be a different version range like
`~1.0.3` which will match anything greater than or equal to `1.0.3` but less than
`1.1.0`.

### Caveats

If you have used a package manager like npm previously, you may be looking for
how to add global dependencies.

For the vast majority of packages it is considered a bad practice to have
global dependencies because they are implicit. It is much better to add
all of your dependencies locally so that they are explicit and anyone else
using your project gets the same set of dependencies.

If you are trying to use a CLI tool that has a `bin` you can access these in
your `./node_modules/.bin` directory.

##### `yarn add <package...>`

This will install a `<package>` in your [`dependencies`](#dependencies).

##### `yarn add <package...> --dev`

This will install a `<package>` in your [`devDependencies`](#devDependencies).

##### `yarn add <package...> --peer`

This will install a `<package>` in your [`peerDependencies`](#peerDependencies).

##### `yarn add <package...> --optional`

This will install a `<package>` in your [`optionalDependencies`](#optionalDependencies).

##### `yarn add <package...> --exact`

[TODO]

This installs the package as an exact version. The default is to use the most
recent release with the same major version. For example, `yarn add foo@1.2.3`
would accept version `1.9.1`, but `yarn add foo@1.2.3 --exact` would only
accept version `1.2.3`.

##### `yarn add <package...> --tilde`

[TODO]

This installs the most recent release of the package that has the same minor
version. The default is to use the most recent release with the same major
version. For example, `yarn add foo@1.2.3 --tilde` would accept `1.2.9` but not
`1.3.0`.
