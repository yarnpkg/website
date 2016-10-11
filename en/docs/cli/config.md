---
id: docs_cli_config
guide: docs_cli
layout: guide
---

<p class="lead">Manages the yarn configuration files.</p>

##### `yarn config set <key> <value> [-g|--global]` <a class="toc" id="toc-yarn-config-set-g-global" href="#toc-yarn-config-set-g-global"></a>

Sets the config `key` to a certain `value`.

Example:

```sh
$ yarn config set init-license BSD-2-Clause
yarn config vx.x.x
success Set "init-license" to "BSD-2-Clause".
✨  Done in 0.05s.

```

##### `yarn config get <key>` <a class="toc" id="toc-yarn-config-get" href="#toc-yarn-config-get"></a>

Echose the value for a given `key` to `stdout`.

Example:

```sh
$ yarn config get init-license
BSD-2-Clause
```

##### `yarn config delete <key>` <a class="toc" id="toc-yarn-config-delete" href="#toc-yarn-config-delete"></a>

Deletes a given `key` from the config.

Example:

```sh
$ yarn config delete test-key
yarn config vx.x.x
success Deleted "test-key".
✨  Done in 0.06s.
```

##### `yarn config list` <a class="toc" id="toc-yarn-config-list" href="#toc-yarn-config-list"></a>

Displays the current configuration.

Example:

```sh
$ yarn config list
yarn config vx.x.x
info yarn config
{ 'version-tag-prefix': 'v',
  'version-git-tag': true,
  'version-git-sign': false,
  'version-git-message': 'v%s',
  'init-version': '1.0.0',
  'init-license': 'MIT',
  'save-prefix': '^',
  'ignore-scripts': false,
  'ignore-optional': true,
  registry: 'https://registry.yarnpkg.com',
  'user-agent': 'yarn/0.15.0 npm/? node/v6.2.1 darwin x64' }
info npm config
{ registry: 'https://registry.npmjs.org/',
  '//localhost:4873/:_authToken': 'some-auth-token' }
✨  Done in 0.05s.

```

