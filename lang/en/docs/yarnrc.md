---
id: docs_configuration_yarnrc
guide: docs_configuration
layout: guide
---

{% include vars.html %}

`.yarnrc` files allow you to configure additional Yarn features. The [`config` command]({{url_base}}/docs/cli/config/) may also be used to set these options. Yarn will merge `.yarnrc` files up the file tree.

### `yarn-offline-mirror` <a class="toc" id="toc-yarn-offline-mirror" href="#toc-yarn-offline-mirror"></a>

```ini
yarn-offline-mirror "./packages-cache"
```

Maintain offline copies of your packages for more repeatable and reliable builds. [Find more information here]({{url_base}}/docs/offline-mirror/).

Value must be a relative file path, or `false` to disable the mirror (default).

### `yarn-offline-mirror-pruning` <a class="toc" id="toc-yarn-offline-mirror-pruning" href="#toc-yarn-offline-mirror-pruning"></a>

```ini
yarn-offline-mirror-pruning true
```

Control automatic pruning of the offline mirror. [Find more information here]({{url_base}}/docs/prune-offline-mirror/).

Value must a boolean, defaults to `false`.

### `disable-self-update-check` <a class="toc" id="toc-disable-self-update-check" href="#toc-disable-self-update-check"></a>

```ini
disable-self-update-check true
```

When installing packages, Yarn will provide upgrade instructions if you have an outdated CLI installation. You can disable this check here.

Value must be a boolean, defaults to `false`.

### `CHILD_CONCURRENCY` <a class="toc" id="toc-child-concurrency" href="#toc-child-concurrency"></a>

```ini
CHILD_CONCURRENCY #number#
```

Controls the number of child processes run parallely to build node modules. 

Setting this number to 1 will cause the node modules to be built sequentially which can avoid linker errors on windows with node-gyp.
