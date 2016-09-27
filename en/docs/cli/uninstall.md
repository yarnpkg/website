---
id: docs_cli_uninstall
guide: docs_cli
layout: guide
---

##### `yarn uninstall <package...>`

Running `yarn uninstall foo` uninstalls the package named `foo`. This command also updates the `package.json` and `yarn.lock` files so that other people using the repository only have to run a `yarn install` to get their state up to date.

You can uninstall several packages at once by listing them all at the command line separated by spaces, like `yarn uninstall foo bar baz`.

With `yarn` there is no way to uninstall a package locally while keeping the `package.json` file the same. This ensures that different users of the same repository have consistent builds.

When you uninstall a package, it is uninstalled from all types of dependencies: development, production, optional, and peer dependencies.
