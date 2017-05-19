---
id: docs_cli_why
guide: docs_cli
layout: guide
---

<p class="lead">Show information about why a package is installed.</p>

##### `yarn why <query>` <a class="toc" id="toc-yarn-why" href="#toc-yarn-why"></a>

This command will identify why a package has been installed, detailing which
other packages depend upon it, for example, or whether it was explicitly marked
as a dependency in the `package.json` manifest.

```sh
yarn why jest
```

```
yarn why vx.x.x
[1/4] 🤔  Why do we have the module "jest"...?
[2/4] 🚚  Initialising dependency graph...
[3/4] 🔍  Finding dependency...
[4/4] 🚡  Calculating file sizes...
info Has been hoisted to "jest"
info This module exists because it's specified in "devDependencies".
info Disk size without dependencies: "1.29kB"
info Disk size with unique dependencies: "101.31kB"
info Disk size with transitive dependencies: "20.35MB"
info Amount of shared dependencies: 125
```

### Query argument <a class="toc" id="toc-query-argument" href="#toc-query-argument"></a>

The mandatory query argument for `yarn why` can be any of:

* a package name (as in the above example)
* a package folder; eg: `yarn why node_modules/once`
* a file within a package folder; eg: `yarn why node_modules/once/once.js`

The file locations can also be absolute.
