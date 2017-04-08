---
id: docs_configuration_envvars
guide: docs_configuration
layout: guide
---

{% include vars.html %}

Environment variables defined in `process.env` allow you to configure additional Yarn features.

### `CHILD_CONCURRENCY` <a class="toc" id="toc-child-concurrency" href="#toc-child-concurrency"></a>

```ini
process.env.CHILD_CONCURRENCY=#number#
```

Controls the number of child processes run parallely to build node modules. 

Setting this number to 1 will cause the node modules to be built sequentially which can avoid linker errors on windows with node-gyp.
