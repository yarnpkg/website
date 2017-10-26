---
id: docs_cli_outdated
guide: docs_cli
layout: guide
---

<p class="lead">Checks for outdated package dependencies.</p>

##### `yarn outdated` <a class="toc" id="toc-yarn-outdated" href="#toc-yarn-outdated"></a>

Lists version information for all package dependencies. This information
includes the currently installed version, the desired version based on semver,
and the latest available version.

For example, say your `package.json` has the following dependencies listed:

```js
"dependencies": {
  "lodash": "4.15.0",
  "underscore": "~1.6.0"
}
```

The command run should look something like this:

```sh
yarn outdated
```

```
Package    Current Wanted Latest Package Type    URL
lodash     4.15.0  4.15.0 4.16.4 devDependencies https://github.com/lodash/lodash#readme
underscore 1.6.0   1.6.0  1.8.3  dependencies    https://github.com/jashkenas/underscore#readme
✨  Done in 0.72s.
```

##### `yarn outdated [package...]` <a class="toc" id="toc-yarn-outdated-package" href="#toc-yarn-outdated-package"></a>

Lists version information for one or more package dependencies.

For the example `package.json` shown previously, you should see the following
output when checking one of the dependencies:

```sh
yarn outdated lodash
```

```
Package Current Wanted Latest Package Type    URL
lodash  4.15.0  4.15.0 4.16.4 devDependencies https://github.com/lodash/lodash#readme
✨  Done in 1.04s.
```
