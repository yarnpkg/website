---
id: docs_yarn_workflow
guide: docs_yarn_workflow
layout: guide
---

Whether you are a Yarn package creator or you are installing a package for use in your project, Yarn tries to make the general use-case workflow for both of those instances as easy as possible.

## Installing a Package

You can install either Yarn or Node packages using the Yarn client. The easiest way to install a package is to use the [`yarn install`](cli/install) command from the root directory of your project. If you want to install the package as intended for runtime, use the `--production` flag. If you want to install dependencies intended for developing the installed package (i.e., the `devDependencies`), then omit the `--production` flag.

> Many package developers add test frameworks as part of their developer dependencies, and it may be useful to you to run the tests of the package before using it in your project using [`yarn run <script>`](cli/run).

```
$ yarn install [--production] <package-name>
```

> As Yarn is just a package client, all packages are installed from the Node package hosting service by default.

This will create a `node_modules` directory in your project's root directory with the package that you just installed. And you can then use that package in your source code.

```JavaScript
var package_name = require('package-name');
:
:
```

### Package Versions

By default, Yarn will install the latest available package when you `yarn install`. If your project has a `package.json` file, you can control the versions of what packages are installed when you run `yarn install` within your package.

## Creating a Package

> For full details, see our [Creating a Package]() section.

The basic flow for creating a Yarn package are:

1. Write the code for the functionality that you want to expose in your package.
1. Initialize your package with `yarn init`. This creates the default metadata for your package in a [`package.json`]() file.
1. Add dependencies to your `package.json` with [`yarn add <package-name>`](cli/add).
1. Add any scripts to your `package.json` that can be used to with `yarn run` (e.g., test or lint scripts).
1. Prepare your package for publishing by committing your source code, `package.json` and [`yarn.lock`]() files.
1. Publish your package.

### Updating Dependencies

After your have published your package, you may want to update its package dependencies as new versions of those packages come online. You can do that with `yarn update` to overwrite existing dependencies with different versions. For example, the following updates an existing dependency to its latest version.

```
$ yarn update <existing-dependency-name>
```

You can use the various [`update` flags]() to control versions, etc.

### Example Package

You can see an [example Yarn package on GitHub](https://github.com/yarnpkg/example-yarn-package).
