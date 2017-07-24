---
id: docs_cli_upgrade_interactive
guide: docs_cli
layout: guide
additional_reading_tags: ["cli-add", "cli-tag", "dependencies-versions", "cli-upgrade"]
---

{% include vars.html %}

<p class="lead">This is similar to npm-check interactive update mode. It provides an easy way to update outdated packages.</p>

##### `yarn upgrade-interactive [--latest]` <a class="toc" id="toc-yarn-upgrade-interactive" href="#toc-yarn-upgrade-interactive"></a>

The `upgrade-interactive` command takes the same parameters as, and functions the same as the base `upgrade` command.
This command will display the outdated packages before performing any upgrade, allowing the user to select which packages to upgrade.
Yarn will respect the version ranges in `package.json` when determining the version to upgrade to.

You can think of `yarn upgrade-interactive` as a combination of the `yarn outdated` and `yarn upgrade [package...]` commands.
Where `yarn outdated` displays the list of outdated packages and `yarn upgrade [package...]` can then be used to upgrade desired packages,
`yarn upgrade-interactive` displays the same outdated package list and lets you immediately chose which to upgrade.

`--latest` : This flag tells yarn to ignore the specified version ranges in `package.json` and instead use the version tagged `latest`
in the registry.

```
[1/? Choose which packages to update. (Press <space> to select, <a> to toggle all, <i> to inverse s
election)
 devDependencies
❯◯ autoprefixer      6.7.7  ❯  7.0.0          https://github.com/postcss/autoprefixer#readme
 ◯ webpack           2.4.1  ❯  2.5.1          https://github.com/webpack/webpack

 dependencies
 ◯ bull              2.2.6  ❯  3.0.0-alpha.3  https://github.com/OptimalBits/bull#readme
 ◯ fs-extra          3.0.0  ❯  3.0.1          https://github.com/jprichardson/node-fs-extra
 ◯ socket.io         1.7.3  ❯  1.7.4          https://github.com/socketio/socket.io#readme
 ◯ socket.io-client  1.7.3  ❯  1.7.4          https://github.com/Automattic/socket.io-client#readme
```
