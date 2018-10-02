---
id: docs_configuration_yarnrc
guide: docs_configuration
layout: guide
---

{% include vars.html %}

`.yarnrc` files allow you to configure additional Yarn features. The [`config` command]({{url_base}}/docs/cli/config/) may also be used to set these options. Yarn will merge `.yarnrc` files up the file tree.

### `yarn-offline-mirror` <a class="toc" id="toc-yarn-offline-mirror" href="#toc-yarn-offline-mirror"></a>

```shell
yarn-offline-mirror "./packages-cache"
```

Maintain offline copies of your packages for more repeatable and reliable builds. [Find more information here]({{url_base}}/docs/offline-mirror/).

Value must be a relative file path, or `false` to disable the mirror (default).

### `yarn-offline-mirror-pruning` <a class="toc" id="toc-yarn-offline-mirror-pruning" href="#toc-yarn-offline-mirror-pruning"></a>

```shell
yarn-offline-mirror-pruning true
```

Control automatic pruning of the offline mirror. [Find more information here]({{url_base}}/docs/prune-offline-mirror/).

Value must be a boolean, defaults to `false`.

### `yarn-path` <a class="toc" id="toc-yarn-path" href="#toc-yarn-path"></a>

```shell
yarn-path "./bin/yarn"
```

Instructs yarn to defer to another Yarn binary for execution. Useful if you want to bundle Yarn into your repository
and have everyone use the same version for consistency. This was introduced in Yarn 1.0, so all developers must have Yarn >= 1.0
installed.

Value must be a relative file path, or `false` to disable (default).

### `disable-self-update-check` <a class="toc" id="toc-disable-self-update-check" href="#toc-disable-self-update-check"></a>

```shell
disable-self-update-check true
```

When installing packages, Yarn will provide upgrade instructions if you have an outdated CLI installation. You can disable this check here.

Value must be a boolean, defaults to `false`.

### `child-concurrency` <a class="toc" id="toc-child-concurrency" href="#toc-child-concurrency"></a>

```shell
child-concurrency #number#
```

Controls the number of child processes run parallely to build node modules.

Setting this number to 1 will cause the node modules to be built sequentially which can avoid linker errors on windows with node-gyp.

### `unsafe-disable-integrity-migration` <a class="toc" id="toc-unsafe-disable-integrity-migration" href="#toc-unsafe-disable-integrity-migration"></a>

```shell
unsafe-disable-integrity-migration false
```
Setting this to `false` will enable the `yarn.lock` checksum migration (enabling sha512 support). Causes lockfile format change.
This will be the default starting from version `2.0`.

### CLI arguments <a class="toc" id="toc-cli-arguments" href="#toc-cli-arguments"></a>

Setting `--<command>.<flag> <value>` in .yarnrc would be the same as running `yarn <command> --<flag> <value>`.

Example:

```
$> cat .yarnrc
--install.check-files true
```

Is the same running `yarn install --check-files`

Example 2:

```
$> cat .yarnrc
--cache-folder /tmp/yarn-cache/

$> yarn cache dir
/tmp/yarn-cache/v1
```
