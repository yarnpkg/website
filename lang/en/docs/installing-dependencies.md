---
id: docs_installing_dependencies
guide: docs_yarn_workflow
layout: guide
additional_reading_tags: ["dependencies", "package-json", "yarn-lock", "cli-install"]
---

{% include vars.html %}

If you have just checked out a package from [version control]({{url_base}}/docs/version-control), you will need to install those dependencies.

> If you are [adding dependencies]({{url_base}}/docs/managing-dependencies#toc-adding-a-dependency) for your project, then those dependencies are automatically installed during that process.

### Installing Dependencies <a class="toc" id="toc-installing-dependencies" href="#toc-installing-dependencies"></a>

[`yarn install`]({{url_base}}/docs/cli/install) is used to install all dependencies for a project. The dependencies are retrieved from your project's `package.json` file, and stored in the `yarn.lock` file.

When developing a package, installing dependencies is most commonly done after:

1.  You have just checked out code for a project that needs these dependencies to function.
1.  Another developer on the project has added a new dependency that you need to pick up.

### Installing Options <a class="toc" id="toc-installing-options" href="#toc-installing-options"></a>

There are many options for installing dependencies, including:

1.  Installing all dependencies: `yarn` or `yarn install`
1.  Installing one and only one version of a package: `yarn install --flat`
1.  Forcing a re-download of all packages: `yarn install --force`
1.  Installing only production dependencies: `yarn install --production`

See [the full list]({{url_base}}/docs/cli/install) of flags you can pass to `yarn install`.
