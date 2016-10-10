---
id: docs_cli_run
guide: docs_cli
layout: guide
---

Runs a defined package script.

##### `yarn run [script]` <a class="toc" id="toc-yarn-run-script" href="#toc-yarn-run-script"></a>

If you have defined a `scripts` object in your package, this command will run the specified `[script]`.

For example,

```
yarn run test
```

would run the script named `test` defined in your package.

##### `yarn run` <a class="toc" id="toc-yarn-run" href="#toc-yarn-run"></a>

If you do not specifiy a script to the `yarn run` command, the this will list all of the scripts available to run for a package.

### Scripts in `package.json` <a class="toc" id="toc-scripts-in-package-json" href="#toc-scripts-in-package-json"></a>

To add executable scripts to your `package.json`, use the `scripts` key.

For example, the following would provide a script named `test` in your package that would run the `jest` test framework on code in your package.

```
"scripts": {
  "test": "jest"
},
```
