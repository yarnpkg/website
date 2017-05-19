---
id: docs_cli_remove
guide: docs_cli
layout: guide
---

##### `yarn remove <package...>` <a class="toc" id="toc-yarn-remove" href="#toc-yarn-remove"></a>

Running `yarn remove foo` will remove the package named `foo` from your direct
dependencies updating your `package.json` and `yarn.lock` files in the process.

Other developers working on the project can run `yarn install` to sync their
own `node_modules` directories with the updated set of dependencies.

When you remove a package, it is removed from all types of dependencies:
`dependencies`, `devDependencies`, etc.

> **Note**: `yarn remove` will always update your `package.json` and
> `yarn.lock`. This ensures that different developers on the same project get
> the same set of dependencies. It is not possible to disable this behavior.

> **Note**: `yarn remove <package> --<flag>` uses the same `flag`s as `yarn install` command.
