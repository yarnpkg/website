---
id: docs_cli_upgrade_interactive
guide: docs_cli
layout: guide
additional_reading_tags: ["cli-add", "cli-tag", "dependencies-versions", "cli-upgrade"]
---

{% include vars.html %}

<p class="lead">This is similar to npm-check interactive update mode. It provides an easy way to update outdated packages.</p>

##### `yarn upgrade-interactive` <a class="toc" id="toc-yarn-upgrade-interactive" href="#toc-yarn-upgrade-interactive"></a>

The default mode installs and updates the packages to use minor versions.

##### `yarn upgrade-interactive [--tilde/-T]` <a class="toc" id="toc-yarn-upgrade-interactive-t" href="#toc-yarn-upgrade-interactive-t"></a>

Using `--tilde` or `-T` installs and updates them as patch versions.

##### `yarn upgrade-interactive [--exact/-E]` <a class="toc" id="toc-yarn-upgrade-interactive-e" href="#toc-yarn-upgrade-interactive-e"></a>

Using `--exact` or `-E` installs and updates them as exact versions.

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
