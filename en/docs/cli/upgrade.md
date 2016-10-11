---
id: docs_cli_upgrade
guide: docs_cli
layout: guide
---

<p class="lead">Upgrades packages to their latest version based on the specified range.</p>

##### `yarn upgrade` <a class="toc" id="toc-yarn-upgrade" href="#toc-yarn-upgrade"></a>

This command updates all dependencies to their latest version based on the version range specified in the `package.json` file. The `yarn.lock` file will be recreated as well.

```sh
$ yarn upgrade
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

Also see:

- [`yarn add`](./add): add a package to use in your current package.
