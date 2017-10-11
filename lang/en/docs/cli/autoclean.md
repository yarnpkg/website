---
id: docs_cli_autoclean
guide: docs_cli
layout: guide
---

<p class="lead">Cleans and removes unnecessary files from package dependencies.</p>

##### `yarn autoclean [-I/--init] [-F/--force]` <a class="toc" id="toc-yarn-autoclean" href="#toc-yarn-autoclean"></a>

The `autoclean` command frees up space by removing unnecessary files and folders from dependencies. It reduces the number of files in your project's `node_modules` folder which is useful in an environment where packages are checked into version control directly.

*Note: This command is considered for advanced use cases only. Unless you are experiencing issues with the amount of files that are installed as part of `node_modules` it is not recommended to use this command. It will permanently delete files in `node_modules` which could cause packages to stop working.*

Autoclean functionality is **disabled** by default. To enable it, manually create a `.yarnclean` file, or run `yarn autoclean --init` to create the file with default entries. The `.yarnclean` file should be added to version control.

When the `.yarnclean` file exists in a package, autoclean functionality will be enabled. The clean will be performed:

* After an `install`
* After an `add`
* If `yarn autoclean --force` is run

The clean is performed by reading each line of the `.yarnclean` file and using each as a glob pattern of files to delete.

**Options:**

`-I/--init` : Creates the `.yarnclean` file if it does not exist, and adds the default entries. This file should then be reviewed and edited to customize which files will be cleaned. If the file already exists, it will not be overwritten.

`-F/--force` : If a `.yarnclean` file exists, run the clean process. If the file does not exist, do nothing.

**Example:**

You decide all YAML and Markdown files in all your dependencies installed in `node_modules` can be safely deleted. You make a `.yarnclean` file containing:

```
*.yaml
*.md
```

You then run `yarn install` or `yarn autoclean --force`. The clean process will delete all `*.yaml` and `*.md` files within `node_modules/` recursively (including nested transient dependencies).
