---
id: docs_configuration_yarn_lock
guide: docs_configuration
layout: guide
---

# About Yarn Lock

Yarn uses a `yarn.lock` file in the root of your project to make dependency resolution fast and reliable.

You never need to touch this file- yarn owns it and will change it when managing dependencies. If anything in your `yarn.lock` file needs to change, you should run `yarn [add|remove]` to have yarn update the lockfile.


**The `yarn.lock` file should always be checked into your repository**. This is important so that your continuous integration process uses *exactly the same* packages as you did while developing. If you don't keep the `yarn.lock` file with your source code, it is possible for other people to run yarn and install a slightly different set of packages. This may result in unexpected bugs.

If you have used `npm shrinkwrap`, then you will see the similarity between `yarn.lock` and `npm-shrinkwrap.json`.
