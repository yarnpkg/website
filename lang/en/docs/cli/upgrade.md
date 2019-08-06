---
id: docs_cli_upgrade
guide: docs_cli
layout: guide
additional_reading_tags: ["cli-add", "cli-tag", "dependencies-versions", "cli-upgrade-interactive"]
---

{% include vars.html %}

<p class="lead">Upgrades packages to their latest version based on the specified range.</p>

##### `yarn upgrade [package | package@tag | package@version | --scope @scope]... [--ignore-engines] [--pattern]` <a class="toc" id="toc-yarn-upgrade-package-package-tag-package-version-scope-ignore-engines-pattern" href="#toc-yarn-upgrade-package-package-tag-package-version-scope-ignore-engines-pattern"></a>

This command updates dependencies to their latest version based on the
version range specified in the `package.json` file. The `yarn.lock` file will
be recreated as well.

Optionally, one or more package names can be specified.
When package names are specified, only those packages will be upgraded.
When no package names are specified, all dependencies will be upgraded.

`[package]` : When a specified package is only a name then the latest patching version
of this package will be upgraded to.

`[package@tag]` : When a specified package contains a tag then the specified tag will
be upgraded to.
[Tag]({{url_base}}/docs/cli/tag#toc-what-are-tags) names are chosen by project
maintainers, typically you use this command to install an experimental or long
term support release of an actively developed package. The tag you choose will
be the version that appears in your `package.json` file.

`[package@version]` : When a specified package contains a version then the specified
version will be upgraded to. The `package.json` dependency reference will also be changed
to match this specified version.
You can use any [SemVer]({{url_base}}/docs/dependency-versions#toc-semantic-versioning)
version number or range.

`--ignore-engines` : This flag can be used to skip the engines check.

Examples:

```sh
yarn upgrade
yarn upgrade left-pad
yarn upgrade left-pad@^1.0.0
yarn upgrade left-pad grunt
yarn upgrade @angular
```

`yarn upgrade --pattern <pattern>` will upgrade all packages that match the pattern.

Examples:

```sh
yarn upgrade --pattern gulp
yarn upgrade left-pad --pattern "gulp|grunt"
yarn upgrade --latest --pattern "gulp-(match|newer)"
```

##### `yarn upgrade [package]... --latest|-L [--caret | --tilde | --exact] [--pattern]` <a class="toc" id="toc-yarn-upgrade-package-latest-l-caret-tilde-exact-pattern" href="#toc-yarn-upgrade-package-latest-l-caret-tilde-exact-pattern"></a>

The `upgrade --latest` command upgrades packages the same as the `upgrade` command,
but ignores the version range specified in `package.json`.
Instead, the version specified by the `latest` tag will be used
(potentially upgrading the packages across major versions).

The `package.json` file will be updated to reflect the latest version range.
By default, the existing range specifier in `package.json` will be reused if
it is one of: ^, ~, <=, >, or an exact version.
Otherwise, it will be changed to a caret (^).
One of the flags `--caret`, `--tilde` or `--exact` can be used to explicitly
specify a range.

Examples:

```sh
yarn upgrade --latest
yarn upgrade left-pad --latest
yarn upgrade left-pad grunt --latest --tilde
```

##### `yarn upgrade (--scope|-S) @scope [--latest] [--pattern]` <a class="toc" id="toc-yarn-upgrade-scope-s-scope-latest-pattern" href="#toc-yarn-upgrade-scope-s-scope-latest-pattern"></a>

`--scope @scope` : When a scope is specified, only packages that begin with that scope will be upgraded. A scope must begin with '@'.

`--latest` : Ignores the version range specified in `package.json`.
Instead, the version specified by the `latest` tag will be used
(potentially upgrading the packages across major versions).

Examples:

```sh
yarn upgrade --scope @angular
yarn upgrade -S @angular
```
