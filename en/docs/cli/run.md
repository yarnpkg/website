---
id: docs_cli_run
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Runs a defined package script.</p>

You may define [`scripts`]({{url_base}}/docs/package-json#toc-scripts) in your
[`package.json`]({{url_base}}/docs/package-json) file.

```json
{
  "name": "my-package",
  "scripts": {
    "build": "babel src -d lib",
    "test": "jest"
  }
}
```

##### `yarn run [script] [-- <args>]` <a class="toc" id="toc-yarn-run-script" href="#toc-yarn-run-script"></a>

If you have defined a `scripts` object in your package, this command will run
the specified `[script]`. For example:

```sh
yarn run test
```

Running this command will execute the script named `"test"` in your
`package.json`.

You can pass additional arguments to your script by using `--`.

```sh
yarn run test -- -o --watch
```

Running this command will execute `test -o --watch`.

`[script]` can also be any locally installed executable that is inside `node_modules/.bin/`.

##### `yarn run` <a class="toc" id="toc-yarn-run" href="#toc-yarn-run"></a>

If you do not specify a script to the `yarn run` command, the `run` command
will list all of the scripts available to run for a package.
