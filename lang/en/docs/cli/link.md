---
id: docs_cli_link
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Symlink a package folder during development.</p>

For development, a package can be linked into another project. This is often
useful to test out new features or when trying to debug an issue in a package
that manifests itself in another project.

There are two commands to facilitate this workflow:

##### `yarn link` (in package you want to link) <a class="toc" id="toc-yarn-link-in-package-you-want-to-link" href="#toc-yarn-link-in-package-you-want-to-link"></a>

This command is run in the package folder you'd like to link. For example if you
are working on `react` and would like to use your local version to debug a
problem in `react-relay`, simply run `yarn link` inside of the `react` project.

##### `yarn link [package...]`<a class="toc" id="toc-yarn-link-package" href="#toc-yarn-link-package"></a>

Use `yarn link [package]` to link another package that you'd like to test into
your current project. To follow the above example, in the `react-relay` project,
you'd run `yarn link react` to use your local version of `react` that you
previously linked.

Complete Example, assuming two project folders `react` and `react-relay` next to each other:

```sh
$ cd react
$ yarn link
yarn link vx.x.x
success Registered "react".
info You can now run `yarn link "react"` in the projects where you want to use this module and it will be used instead.
```

```sh
$ cd ../react-relay
$ yarn link react
yarn link vx.x.x
success Registered "react".
```

This will create a symlink named `react-relay/node_modules/react` that links to
your local copy of the `react` project.

To reverse this process, simply use `yarn unlink` or `yarn unlink [package]`. Also see:

* [`yarn unlink`]({{url_base}}/docs/cli/unlink): unlink a linked package.
