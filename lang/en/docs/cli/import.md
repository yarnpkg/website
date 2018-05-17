---
id: docs_cli_import
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Generates `yarn.lock` from an npm `package-lock.json` file in the
same location or an existing npm-installed `node_modules` folder.</p>

##### `yarn import` <a class="toc" id="toc-yarn-import" href="#toc-yarn-import"></a>

This command assists the migration of projects currently relying on `package-lock.json`,
minimizing the differences between the lockfile and the existing dependency tree
as best as it can.

### Motivation <a class="toc" id="toc-motivation" href="#toc-motivation"></a>

Many projects currently use `package-lock.json` or check their `node_modules` into
source control because they have fragile dependency trees. These projects can’t
easily migrate to Yarn, because `yarn install` could produce a wildly different
logical dependency tree. Not all trees can be represented by Yarn’s `yarn.lock`,
and some valid trees will be automatically deduped upon install. These nuances
and others present a significant barrier to manual migration.

`yarn import` aims to alleviate this challenge by generating a `yarn.lock` file
in one of two ways:
1. Using the dependency tree in an existing `package-lock.json` file created by
 `npm install`
2. If no such file exists, using the versions found inside `node_modules` according
 to normal `require.resolve()` resolution rules.

In cases where the Yarn resolution mechanism can’t satisfy the existing dependency
tree identically, alerts will be made so that you may manually review the changes.
The existing `node_modules` tree will be checked for validity beforehand (if
not importing from `package-lock.json`), and the resultant lockfile should be
`yarn install`able without any surprises (failed compatibility, unresolvable
dependencies, auto-dedupes, etc.)

```sh
$ yarn import
```

```
yarn import vx.x.x
success Folder in sync.
warning Using version "2.2.4" of "lru-cache" instead of "2.7.3" for "ngstorage > grunt > minimatch"
warning Using version "2.0.6" of "readable-stream" instead of "2.2.9" for "ngstorage > karma > chokidar > readdirp"
[...]
success Saved lockfile.
✨  Done in 11.96s.
```
