---
id: docs_managing_dependencies
guide: docs_yarn_workflow
layout: guide
additional_reading_tags: ["dependencies", "cli-add"]
---

When you want to add, update, or remove dependencies there are a couple of
different commands you need to know.

In every `package.json` file there may be a couple of different fields for
listing dependencies:

- `dependencies`
- `devDependencies`
- `peerDependencies`
- `optionalDependencies`

### `yarn.lock` <a class="toc" id="toc-yarn-lock" href="#toc-yarn-lock"></a>

[TODO]

### Adding a dependency <a class="toc" id="toc-adding-a-dependency" href="#toc-adding-a-dependency"></a>

When you want to use another package, you first need to add it to your
dependencies. This means running `yarn add [package-name]` to install it into
your project.

When you want to add a package as a dependency you use `yarn add`:

```sh
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

This will add the dependencies to your `node_modules` directory and update your
`package.json` and `yarn.lock` files to reflect the change.

```diff
  {
    "name": "my-package",
    "dependencies": {
+     "package-1": "^1.0.0"
    }
  }
```

You can also add other types of dependencies using flags:

- `yarn add --dev` to add to `devDependencies`
- `yarn add --peer` to add to `peerDependencies`
- `yarn add --optional` to add to `optionalDependencies`

### Updating a dependency <a class="toc" id="toc-updating-a-dependency" href="#toc-updating-a-dependency"></a>

```sh
yarn update [package]
yarn update [package]@[version]
yarn update [package]@[tag]
```

This will update your `package.json` and your `yarn.lock` file.

```diff
  {
    "name": "my-package",
    "dependencies": {
-     "package-1": "^1.0.0"
+     "package-1": "^2.0.0"
    }
  }
```

### Removing a dependency <a class="toc" id="toc-removing-a-dependency" href="#toc-removing-a-dependency"></a>

```sh
yarn remove [package]
```

This will update your `package.json` and your `yarn.lock` file.
