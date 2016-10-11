---
id: docs_cli_clean
guide: docs_cli
layout: guide
---

<p class="lead">Cleans and removes unnecessary files from package dependencies.</p>

##### `yarn clean` <a class="toc" id="toc-yarn-clean" href="#toc-yarn-clean"></a>

The `clean` command frees up space by removing unnecessary files and folders from dependencies. It reduces the number of files in your project's `node_modules` folder which is useful in an environment where packages are checked into version control directly.

One you run `yarn clean`, Yarn will create a `.yarnclean` file that should be added to version control. Cleaning is then automatically done as part of `yarn install` (or simply `yarn`) and `yarn add`.

*Note: This command is considered for advanced use cases only. Unless you are experiencing issues with the amount of files that are installed as part of `node_modules` it is not recommended to use this command. It uses a heuristic to identify files that may not be needed from a distributed package and may not be entirely safe.*
