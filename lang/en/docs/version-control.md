---
id: docs_version_control
guide: docs_yarn_workflow
layout: guide
additional_reading_tags: ["dependencies", "package-json", "yarn-lock"]
---

To have people successfully develop or use your package, you need to ensure that all the necessary files are checked into your source control system.

### Required Files <a class="toc" id="toc-required-files" href="#toc-required-files"></a>

The following files must be checked into source control for anyone to be able to manage your package:

* `package.json`: This has all the current dependencies for your package.
* `yarn.lock`: This stores the exact versions of each dependency for your package.
* The actual source code that provides the functionality for your package.

> Check out the [Yarn Example Package](https://github.com/yarnpkg/example-yarn-package) for the minimum requirements necessary for a Yarn package.
