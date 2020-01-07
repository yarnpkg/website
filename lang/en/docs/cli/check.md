---
id: docs_cli_check
guide: docs_cli
layout: guide
---

##### `yarn check` <a class="toc" id="toc-yarn-check" href="#toc-yarn-check"></a>

Verifies that versions of the package dependencies in the current project's `package.json` match those in yarn's lock file.

**NOTE**: The command `yarn check` has been historically buggy and undermaintained and, as such, [has been deprecated and will be removed in Yarn 2.0](https://github.com/yarnpkg/rfcs/pull/106). You should use `yarn install --check-files` instead.

The switches `--integrity` and `--verify-tree` are mutually exclusive.

##### `yarn check --integrity` <a class="toc" id="toc-yarn-check-integrity" href="#toc-yarn-check-integrity"></a>

Verifies that versions and hashed values of the package contents in the project's `package.json` match those in yarn's lock file. This helps to verify that the package dependencies have not been altered.

##### `yarn check --verify-tree` <a class="toc" id="toc-yarn-check-verify-tree" href="#toc-yarn-check-verify-tree"></a>

Recursively verifies that the dependencies in `package.json` are present in `node_modules` and have the right version. This check does not consider `yarn.lock`.
