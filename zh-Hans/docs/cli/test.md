---
id: docs_cli_test
guide: docs_cli
layout: guide
---

<p class="lead">Runs the test script defined by the package.</p>

##### `yarn test` <a class="toc" id="toc-yarn-test" href="#toc-yarn-test"></a>

If you have defined a `scripts` object in your package, this command will run
the specified `test` script.

For example, if you have a bash script in your package, `scripts/test`:

```sh
#!/bin/bash

echo "Hello, world!"
```

and the following in your `package.json`:

```json
{
  "name": "my-tribute-package",
  "version": "1.0.0",
  "description": "This is not the best package in the world, this is just a tribute.",
  "main": "index.js",
  "author": "Yarn Contributor",
  "license": "MIT",
  "scripts": {
    "test": "scripts/test"
  }
}
```

then running `yarn test` would yield:

```sh
$ yarn test
yarn test v0.15.1
$ "./scripts/test"
Hello, world!
✨ Done in 0.17s.
```
##### `yarn run test`

`yarn test` is also a shortcut for `yarn run test`.
