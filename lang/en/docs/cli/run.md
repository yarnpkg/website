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

##### `yarn run [script] [<args>]` <a class="toc" id="toc-yarn-run-script" href="#toc-yarn-run-script"></a>

If you have defined a `scripts` object in your package, this command will run
the specified `[script]`. For example:

```sh
yarn run test
```

Running this command will execute the script named `"test"` in your
`package.json`.

You can pass additional arguments to your script by passing them after the script name.

```sh
yarn run test -o --watch
```

Running this command will execute `jest -o --watch`.

`[script]` can also be any locally installed executable that is inside `node_modules/.bin/`.

It's also possible to leave out the `run` in this command, each script can be executed with its name: 

```sh
yarn test -o --watch
```

Running this command will do the same as `yarn run test -o --watch`. Note that built-in cli commands will have preference over your scripts, so you shouldn't always rely on this shortcut in other scripts

##### `yarn run env` <a class="toc" id="toc-yarn-run-env" href="#toc-yarn-run-env"></a>

Running this command will list environment variables available to the scripts at runtime.

If you want to override this command, you can do so by defining your own `"env"` script in `package.json`.

##### `yarn run` <a class="toc" id="toc-yarn-run" href="#toc-yarn-run"></a>

If you do not specify a script to the `yarn run` command, the `run` command
will list all of the scripts available to run for a package.
