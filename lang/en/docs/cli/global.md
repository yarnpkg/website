---
id: docs_cli_global
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Install packages globally on your operating system.</p>

##### `yarn global <add/bin/ls/remove/upgrade> [--prefix]` <a class="toc" id="toc-yarn-global" href="#toc-yarn-global"></a>

`yarn global` is a prefix used for a number of commands like `add`, `bin`, `ls` and `remove`. They behave identically to their normal versions except that they use a global directory to store packages. The `global` command makes binaries available to use on your operating system.

*Note: Unlike the `--global` flag in npm, `global` is a command which must immediately follow `yarn`. Entering `yarn add global package-name` will add the packages named `global` and `package-name` locally instead of adding `package-name` globally.*

This is useful for developer tooling that is not part of any individual project but instead is used for local commands. One such example is [create-react-app](https://github.com/facebookincubator/create-react-app) which can be installed globally like this:

```sh
$ yarn global add create-react-app --prefix /usr/local
# the `create-react-app` command is now available globally:
$ which create-react-app
$ /usr/local/bin/create-react-app
$ create-react-app
````

### Defining install location

`yarn global bin` will output the location where Yarn will install symlinks to your installed binaries. You can configure the base location with `yarn config set prefix <filepath>`. For example, `yarn config set prefix ~/.yarn` will ensure all global packages will have their binaries installed to `~/.yarn/bin`.

Read more about the commands that can be used together with `yarn global`:

- [`yarn add`]({{url_base}}/docs/cli/add): add a package to use in your current package. 
- [`yarn bin`]({{url_base}}/docs/cli/bin): displays the location of the yarn bin folder.
- [`yarn list`]({{url_base}}/docs/cli/list): list installed packages.
- [`yarn remove`]({{url_base}}/docs/cli/remove): remove a package that will no longer be used in your current package.
- [`yarn upgrade`]({{url_base}}/docs/cli/upgrade): upgrades packages to their latest version based on the specified range.
