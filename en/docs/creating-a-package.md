---
id: docs_creating_a_package
guide: docs_creating_a_package
layout: guide
---

A Yarn package, at a minimum, requires the actual code that will be exposed from the package and a `package.json` file to provide metadata about your package.

## Write Your Code

The goal of all Yarn packages is to expose some functionality that will be useful to other developers. Thus, your first item of business in creating your Yarn package is to actually write that code.

In its simplest form, you can create an `index.js` file that exports all of the public functionality for your package.

### Package Tests

Optionally, you can create tests for your package that will verify that everything you are exposing publicly is working correctly. Normally these will go under `devDependencies` in your `package.json` and can include anything from testing frameworks such as [Jest](https://facebook.github.io/jest/) or linting providers such as [eslint](http://eslint.org/).

## Create Your Yarn Package

Now that your package code is written, it is time to start creating your Yarn package.

### Initialization

To help get you started in creating the metadata associated with your project, Yarn provides an `init` command to create an initial `package.json` file skeleton.

In your project's root directory, run:

```
$ yarn init
```

Answer the associated questions. Afterwards, a `package.json` will have been created.

### Modify `package.json`

In the simplest of packages, running the `init` command may all you need to do in order to publish your package. For example, your package has no external dependencies on other Yarn packages, etc. In this case, no modification to the `package.json` will be necessary.

However, many times a package requires dependencies on other packages in order to be utilized successfully. Or, some packages are required for development of your package only (e.g., a testing framework).

You can modify your `package.json` file by hand to expand on the default created by `init` by as little or as much as necessary. Examples of custom fields include:

```json
dependencies {} # package dependencies required at runtime
devDependencies {} # package dependencies required when building from source
scripts {} # scripts that can be run when you `yarn run <script-name>`
```

## Test your package

Now that you have the actual code for your project and have completed specifying all of the metadata that will be needed to install and use your package, you can make sure it installs correctly. You will use the [`yarn install` command](./cli/install) to test the installation of your package.

### Testing Build Time Behavior

```
$ yarn install
```

The `install` command with no additional flags installs both `dependencies` and `devDependencies` from your `packagee.json`, allowing you to test your "build from source" package behavior.

### Testing Runtime Behavior
```
$ yarn install --production
```

Adding the `--production` flag to the `install` command installs only your `dependencies` from your `package.json`, allowing you to test your general runtime package behavior.

## Prepare to Publish Your Package

At this point, you can prepare your package for publication.
