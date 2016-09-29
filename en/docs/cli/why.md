---
id: docs_cli_why
guide: docs_cli
layout: guide
---

<p class="lead">Show information about why a package is installed.</p>

##### `yarn why <query>`

This command will identify why a package has been installed, detailing which
other packages depend upon it, for example, or whether it was explicitly marked
as a dependency in the `package.json` manifest.

```
$ yarn why once

yarn why vx.x.x
[1/3] 🤔  Why do we have the module once...?
[2/3] 🚚  Initialising dependency graph...
warning No license field
[3/3] 🔍  Finding dependency...
info This module exists because it's "Depended on by \"babel-cli#glob\""
info Disk size without dependencies: "1MB"
info Disk size with unique dependencies: "2MB"
info Disk size with transitive dependencies: "3MB"
info Amount of shared dependencies: 4
```

### Query argument

The mandatory query argument for `yarn why` can be any of:

* a package name (as in the above example)
* a package folder; eg: `yarn why node_modules/once`
* a file within a package folder; eg: `yarn why node_modules/once/once.js`

The file locations can also be absolute.
