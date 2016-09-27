---
id: docs_cli_add
guide: docs_cli
layout: guide
---

##### `yarn add <package...>`

Installs a package and any packages that it depends on. Running `yarn add` saves the dependency information to `package.json` and `yarn.lock` so that other developers working on the project will also get these dependencies when they run `yarn install`.

Yarn does not install packages globally. There is no equivalent of `npm install -g <package>`. Every time you run `yarn add` you must be running this from an existing project.

Most commonly, a package is hosted on the [npm registry](https://www.npmjs.com/) and referred to by a single alphanumeric string. For example, `yarn add lodash` installs the `lodash` package.

In general, a package is simply a folder with code and a `package.json` file that describes the contents. You can refer to a package a number of different ways:

1. `yarn add package-name` installs the package from the [npm registry](https://www.npmjs.com/).
2. `yarn add package-name@1.2.3` installs a specific version of a package from the registry.
3. `yarn add package-name@dist-tag` installs a specific tagged distribution. Often the tag is a descriptive word like `beta`, `next` or `latest`.
4. `yarn add /path/to/some/local/folder` installs a package that is on your local filesystem. This is useful when you are developing a new version of a package, so that you can test it out from a different project.
5. `yarn add /path/to/some/tarball.tgz` installs a package from a gzipped tarball. This is useful if you are distributing a package for testing outside of npm.
6. `yarn add <git remote url>` installs a package from a git remote url. It should point to a folder that contains a `package.json`.
7. `yarn add http://somewebsite.org/with/a/tarball.tgz` installs a package from a remote gzipped tarball.

##### `yarn add <package...> --dev`

This installs the package as a "development dependency", tracked in the `devDependencies` field in `package.json`. Use this for packages that are used during development, but not in product, such as `webpack` or `babel`.

##### `yarn add <package...> --peer`

This installs the package as a "peer dependency". In the normal flow of product development, you generally will not use peer dependencies. A peer dependency means that the package is needed at runtime, but it must be the same package that is available to application code, rather than a separate version that is only available to this library. This is generally useful for things like plugins and mixins where you want your package to alter the behavior of another package. A plugin would specify the modified package as a peer dependency.

##### `yarn add <package...> --optional`

This installs the package as an "optional dependency". It is okay if an optional dependency fails to install on some machines. The code in the package should gracefully handle this case.

One common situation where optional dependencies are helpful is when a package only works on some operating systems or some particular environments, but a less-efficient fallback also exists. In this case, the more-efficient package can be an optional dependency, and the code in the main package can fall back to the less-efficient package when the optional dependency cannot be imported.

##### `yarn add <package...> --exact`

This installs the package as an exact version. The default is to use the most recent release with the same major version. For example, `yarn add foo@1.2.3` would accept version `1.9.1`, but `yarn add foo@1.2.3 --exact` would only accept version `1.2.3`.

##### `yarn add <package...> --tilde`

This installs the most recent release of the package that has the same minor version. The default is to use the most recent release with the same major version. For example, `yarn add foo@1.2.3 --tilde` would accept `1.2.9` but not `1.3.0`.
