---
id: docs_cli_ls
guide: docs_cli
layout: guide
---

<p class="lead">List installed packages.</p>

##### `yarn ls` <a class="toc" id="toc-yarn-ls" href="#toc-yarn-ls"></a>

```sh
yarn ls
```

The `yarn ls` command mimics the expected Unix behavior of listing. In Yarn, the `ls` 
command lists all dependencies for the current working directory by referencing all 
package manager meta data files, which includes a project's dependencies.

```
yarn ls vx.x.x
├─ package-1@1.3.3
├─ package-2@5.0.9
│  └─ package-3@^2.1.0
└─ package-3@2.7.0
```

##### `yarn ls [--depth]` <a class="toc" id="toc-yarn-ls-depth" href="#toc-yarn-ls-depth"></a>

By default, all packages and their dependencies will be displayed. To restrict the depth of the
dependencies, you can add a flag, `--depth`, along with the desired level to the `ls` command. 

```
yarn ls --depth=0
```
Keep in mind, levels are zero-indexd.
