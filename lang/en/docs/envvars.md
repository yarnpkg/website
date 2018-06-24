---
id: docs_configuration_envvars
guide: docs_configuration
layout: guide
---

{% include vars.html %}

Environment variables defined in `process.env` allow you to configure additional Yarn features.

### `CHILD_CONCURRENCY` <a class="toc" id="toc-child-concurrency" href="#toc-child-concurrency"></a>

```javascript
process.env.CHILD_CONCURRENCY=#number#
```

Controls the number of child processes run parallely to build node modules.

Setting this number to 1 will cause the node modules to be built sequentially which can avoid linker errors on windows with node-gyp.

### `npm_config` <a class="toc" id="toc-npm-config" href="#toc-npm-config"></a>

For backward compatiibilty with `npm`, Yarn allows passing down `npm` configuration via environment variables. For instance, the `--build-from-source` `npm` CLI flag becomes: `npm_config_build_from_source=true`. For more information on configuring `npm`, refer to the [npm-config](https://docs.npmjs.com/misc/config) page.
