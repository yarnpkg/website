---
id: docs_cli_remove
guide: docs_cli
layout: guide
---

##### `yarn remove [package]` <a class="toc" id="toc-yarn-remove-package" href="#toc-yarn-remove-package"></a>

Running `yarn remove foo` removes the package named `foo`. This command also updates the `package.json` and `yarn.lock` files so that other people using the repository only have to run `yarn` or `yarn install` to get their state up to date.

You can remove several packages at once by listing them all at the command line separated by spaces, like `yarn remove foo bar baz`.

With `yarn` there is no way to remove a package locally while keeping the `package.json` file the same. This ensures that different users of the same repository have consistent builds.

When you remove a package, it is removed from all types of dependencies: development, production, optional, and peer dependencies.
