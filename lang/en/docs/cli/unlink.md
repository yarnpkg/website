---
id: docs_cli_unlink
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Unlink a previously created symlink for a package.</p>

To remove a symlinked package created with [`yarn link`]({{url_base}}/docs/cli/link), `yarn unlink` can be used.

##### `yarn unlink` <a class="toc" id="toc-yarn-unlink" href="#toc-yarn-unlink"></a>

Run `yarn unlink` in the folder that was previously used to create a link.

##### `yarn unlink [package]`<a class="toc" id="toc-yarn-unlink-package" href="#toc-yarn-unlink-package"></a>

To unlink a package that was symlinked during development in your project, simply
run `yarn unlink [package]`. You will need to run `yarn install --check-files` to re-install
the package that was linked, for more info [see issue 1957](https://github.com/yarnpkg/yarn/issues/1957).

Continued example from the [`yarn link`]({{url_base}}/docs/cli/link) documentation: assume two folders
`react` and `react-relay` that are located next to each other with `react` linked
into the `react-relay` project:

```sh
$ cd react
$ yarn unlink
yarn link vx.x.x
success Unregistered "react".
```

```sh
$ cd ../react-relay
$ yarn unlink react
yarn link vx.x.x
success Unregistered "react".
```

Also see:

- [`yarn link`]({{url_base}}/docs/cli/link): symlink a package for local development.
