---
id: docs_cli_upgrade
guide: docs_cli
layout: guide
additional_reading_tags: ["cli-add", "cli-tag", "dependencies-versions"]
---

{% include vars.html %}

<p class="lead">Upgrades packages to their latest version based on the specified range.</p>

##### `yarn upgrade` <a class="toc" id="toc-yarn-upgrade" href="#toc-yarn-upgrade"></a>

This command updates all dependencies to their latest version based on the
version range specified in the `package.json` file. The `yarn.lock` file will
be recreated as well.

```sh
yarn upgrade
```

```
yarn upgrade vx.x.x
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
success Saved 867 new dependencies.
[...]
├─ jest-cli@16.0.1
│  ├─ yargs-parser@3.2.0
│  └─ yargs@5.0.0
├─ jest-diff@16.0.0
│  └─ diff@3.0.1
[...]
└─ yargs@4.8.1
✨  Done in 20.79s.
```

##### `yarn upgrade [package]` <a class="toc" id="toc-yarn-upgrade-package" href="#toc-yarn-upgrade-package"></a>

This upgrades a single named package to the version specified by the `latest`
tag (potentially upgrading the package across major versions).

```sh
yarn upgrade d3-scale
```

```
yarn upgrade vx.x.x
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency
└─ d3-scale@1.0.3
✨  Done in 6.10s.
```

This will update your `package.json` to look like this:

```diff
-  "d3-scale": "^0.9.3",
+  "d3-scale": "^1.0.3",
```

##### `yarn upgrade [package@version]` <a class="toc" id="toc-yarn-upgrade-package-version" href="#toc-yarn-upgrade-package-version"></a>

This will upgrade (or downgrade) an installed package to the specified version.
You can use any
[SemVer]({{url_base}}/docs/dependency-versions#toc-semantic-versioning) version
number or range.

```sh
yarn upgrade d3-scale@1.0.2
```

```
yarn upgrade vx.x.x
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency
└─ d3-scale@1.0.2
✨  Done in 6.43s.
```

This will update your `package.json` to look like this:

```diff
-  "d3-scale": "^1.0.3",
+  "d3-scale": "^1.0.2",
```

##### `yarn upgrade [package@tag]` <a class="toc" id="toc-yarn-upgrade-package-tag" href="#toc-yarn-upgrade-package-tag"></a>

This will upgrade a package to the version identified by `tag`.
[Tag]({{url_base}}/docs/cli/tag#toc-what-are-tags) names are chosen by project
maintainers, typically you use this command to install an experimental or long
term support release of an actively developed pacakge. The tag you choose will
be the version that appears in your `package.json` file.

```sh
yarn upgrade react@next
```

```
yarn upgrade v0.16.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency
└─ react@15.4.0-rc.4
✨  Done in 3.73s.
```

This will update your `package.json` to look like:

```diff
-  "react": "^15.3.2",
+  "react": "next",
```

Similarly, using the `latest` tag will result in an updated `package.json` that
looks like:

```diff
-  "react": "^15.3.2",
+  "react": "latest",
```

##### `yarn upgrade [package] --ignore-engines` <a class="toc" id="toc-yarn-upgrade-package-ignore-engines" href="#toc-yarn-upgrade-package-ignore-engines"></a>

This upgrades a single named package to the version specified by the `latest`
tag ignoring engines check.

```sh
yarn upgrade d3-scale --ignore-engines
```

```
yarn upgrade vx.x.x
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency
└─ d3-scale@1.0.3
✨  Done in 6.10s.
```

This will update your `package.json` to look like this:

```diff
-  "d3-scale": "^0.9.3",
+  "d3-scale": "^1.0.3",
```
