---
id: docs_cli_bin
guide: docs_cli
layout: guide
---

{% include vars.html %}

Displays the location of the yarn `bin` folder.

##### `yarn bin [<executable>]` <a class="toc" id="toc-yarn-bin" href="#toc-yarn-bin"></a>

- `yarn bin` will print the folder where yarn will install executable files for your package. An example of an executable may be a script that you have defined for your package that can be executed via [`yarn run`]({{url_base}}/docs/cli/run).

Example:

```sh
$ yarn bin
/home/emillumine/Code/Funkwhale/funkwhale/front/node_modules/.bin
```

- `yarn bin <executable>` will print the path to the executable file.

Example:

```sh
$ yarn bin gettext-compile
/home/emillumine/Code/Funkwhale/funkwhale/front/node_modules/.bin/gettext-compile
```
