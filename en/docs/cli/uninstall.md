---
id: docs_cli_uninstall
guide: docs_cli
layout: guide
---

##### `yarn uninstall <module>`

Running `yarn uninstall foo` uninstalls the module named `foo`. This command also updates the `package.json` and `yarn.lock` files so that other people using the repository only have to run a `yarn install` to get their state up to date.

With `yarn` there is no way to uninstall a module locally while keeping the `package.json` file the same. This ensures that different users of the same repository have consistent builds.

When you uninstall a module, it is uninstalled from all types of dependencies: development, production, optional, and peer dependencies.
