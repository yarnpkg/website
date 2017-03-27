---
id: docs_cli_ls
guide: docs_cli
layout: guide
---

<p class="lead">List installed packages.</p>

##### `yarn list` <a class="toc" id="toc-yarn-ls" href="#toc-yarn-ls"></a>

```sh
yarn list
```

The `yarn list` command mimics the expected Unix behavior of listing. In Yarn, the `list` 
command lists all dependencies for the current working directory by referencing all 
package manager meta data files, which includes a project's dependencies.
<!--email_off-->
```
yarn list vx.x.x
├─ package-1@1.3.3
├─ package-2@5.0.9
│  └─ package-3@^2.1.0
└─ package-3@2.7.0
```
<!--/email_off-->
##### `yarn list [--depth]` <a class="toc" id="toc-yarn-ls-depth" href="#toc-yarn-ls-depth"></a>

By default, all packages and their dependencies will be displayed. To restrict the depth of the
dependencies, you can add a flag, `--depth`, along with the desired level to the `list` command. 

```
yarn list --depth=0
```
Keep in mind, levels are zero-indexed.
