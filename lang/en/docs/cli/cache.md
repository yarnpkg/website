---
id: docs_cli_cache
guide: docs_cli
layout: guide
---

##### `yarn cache list` <a class="toc" id="toc-yarn-cache-ls" href="#toc-yarn-cache-ls"></a>

Yarn stores every package in a global cache in your user directory on the file
system. `yarn cache list` will print out every cached package.

##### `yarn cache dir` <a class="toc" id="toc-yarn-cache-dir" href="#toc-yarn-cache-dir"></a>

Running `yarn cache dir` will print out the path where yarn's global cache is currently stored.

##### `yarn cache clean <module_name>` <a class="toc" id="toc-yarn-cache-clean" href="#toc-yarn-cache-clean"></a>

Running this command will clear the global cache. It will be populated again the
next time `yarn` or `yarn install` is run. Additionally, you can specify name of package you want to clean.

### Change the cache path for yarn <a class="toc" id="toc-change-the-cache-path-for-yarn" href="#toc-change-the-cache-path-for-yarn"></a>

Set `cache-folder` config value to configure the cache directory.
```sh
yarn config set cache-folder <path>
```

You can also specify the cache directory by flag `--cache-folder`:
```sh
yarn <command> --cache-folder <path>
```

You can also specify the cache directory by environment variable `YARN_CACHE_FOLDER`:
```sh
YARN_CACHE_FOLDER=<path> yarn <command>
```

