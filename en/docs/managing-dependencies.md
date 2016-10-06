---
id: docs_managing_dependencies
guide: docs_yarn_workflow
layout: guide
additional_reading_tags: ["dependencies", "package-json", "yarn-lock", "cli-add", "cli-upgrade", "cli-remove"]
---

{% include vars.html %}

When you want to add, upgrade, or remove dependencies there are a couple of
different commands you need to know.

Each command will automatically update your
[`package.json`]({{url_base}}/docs/package-json) and
[`yarn.lock`]({{url_base}}/docs/yarn-lock) files.

### Adding a dependency <a class="toc" id="toc-adding-a-dependency" href="#toc-adding-a-dependency"></a>

If you want to use another package, you first need to add it as a dependency.
In order to do that you should run:

```sh
yarn add [package]
```

This will automatically add the `[package]` to your dependencies in your
`package.json`. It will also update your `yarn.lock` to reflect the change.

```diff
  {
    "name": "my-package",
    "dependencies": {
+     "package-1": "^1.0.0"
    }
  }
```

You can also add other
[types of dependencies]({{url_base}}/docs/dependency-types) using flags:

- `yarn add --dev` to add to `devDependencies`
- `yarn add --peer` to add to `peerDependencies`
- `yarn add --optional` to add to `optionalDependencies`

You can specify which version of a package you want to install by specifying
either a [dependency version]({{url_base}}/docs/dependency-versions) or a
[tag]({{url_base}}/docs/cli/tag).

```sh
yarn add [package]@[version]
yarn add [package]@[tag]
```

The `[version]` or `[tag]` will be what gets added to your `package.json`
and then resolved against when installing the dependency.

For example:

```sh
yarn add package-1@1.2.3
yarn add package-2@^1.0.0
yarn add package-3@beta
```

```json
{
  "dependencies": {
    "package-1": "1.2.3",
    "package-2": "^1.0.0",
    "package-3": "beta"
  }
}
```



### Upgrading a dependency <a class="toc" id="toc-upgrading-a-dependency" href="#toc-upgrading-a-dependency"></a>

```sh
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[dist-tag]
```

This will upgrade your `package.json` and your `yarn.lock` file.

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
