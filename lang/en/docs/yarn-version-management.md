---
id: docs_yarn_version_management
guide: docs_yarn_version_management
layout: guide
---

{% include vars.html %}

## Motivation <a class="toc" id="toc-motivation" href="#toc-motivation"></a>

As your usage of yarn grows, you will find yourself with projects that depend on certain versions of yarn.
Once you hit this scale it can be difficult to keep all your projects compatible with the latest version of yarn.
This becomes increasingly more difficult if you have many developers working on these projects, as it is near impossible to have all project-contributors running the same version of yarn.
To mitigate this, you can manage your version of yarn per project.

#### Use `yvm`, the yarn version manager <a class="toc" id="toc-use-yvm-the-yarn-version-manager" href="#toc-use-yvm-the-yarn-version-manager"></a>

You [can use yvm](https://yvm.js.org/) to manage your yarn versions

#### Commit the yarn binary to the project and use `yarn-path` in `.yvmrc` <a class="toc" id="toc-commit-the-yarn-binary-to-the-project-and-use-yarn-path-in-yvmrc" href="#toc-commit-the-yarn-binary-to-the-project-and-use-yarn-path-in-yvmrc"></a>

See [`yarn-path` in the yarnrc docs](/lang/en/docs/yarnrc/#toc-yarn-path)
