---
id: docs_cli_init
guide: docs_cli
layout: guide
---

<p class="lead">Interactively creates or updates a package.json file.</p>

##### `yarn init` <a class="toc" id="toc-yarn-init" href="#toc-yarn-init"></a>

This command walks you through an interactive session to create a `package.json` file. Some defaults such as the license and initial version are found in yarn's `init-*` config settings. 

Here's an example of running the command inside of a directory named `testdir`:

```sh
$ yarn init
question name (testdir): my-awesome-package
question version (1.0.0): 
question description: The best package you will ever find.
question entry point (index.js): 
question git repository: https://github.com/yarnpkg/example-yarn-package
question author: Yarn Contributor
question license (MIT): 
success Saved package.json
✨  Done in 87.70s.
```

This results in the following `package.json`:

```js
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "The best package you will ever find.",
  "main": "index.js",
  "repository": {
    "url": "https://github.com/yarnpkg/example-yarn-package",
    "type": "git"
  },
  "author": "Yarn Contributor",
  "license": "MIT"
}
```

If you already have an existing `package.json` file, then it will use the file's entries as defaults.

The following existing `package.json`:

```js
{
  "name": "my-existing-package",
  "version": "0.1",
  "description": "I exist therefore I am.",
  "repository": {
    "url": "https://github.com/yarnpkg/example-yarn-package",
    "type": "git"
  },
  "license": "BSD-2-Clause"
}
```

Results in the following defaults during the interactive session:

```sh
$ yarn init
question name (my-existing-package): 
question version (0.1): 
question description (I exist therefore I am.):
question entry point (index.js): 
question git repository (https://github.com/yarnpkg/example-yarn-package): 
question author: Yarn Contributor
question license (BSD-2-Clause): 
success Saved package.json
✨  Done in 121.53s.
```