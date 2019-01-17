---
id: docs_workspaces
guide: docs_workspaces
layout: guide
---

{% include vars.html %}

Workspaces are a new way to setup your package architecture that's available by default starting from Yarn 1.0. It allows you to setup multiple packages in such a way that you only need to run `yarn install` once to install all of them in a single pass.

### Why would you want to do this? <a class="toc" id="toc-why-would-you-want-to-do-this" href="#toc-why-would-you-want-to-do-this"></a>

- Your dependencies can be linked together, which means that your workspaces can depend on one another while always using the most up-to-date code available. This is also a better mechanism than `yarn link` since it only affects your workspace tree rather than your whole system.

- All your project dependencies will be installed together, giving Yarn more latitude to better optimize them.

- Yarn will use a single lockfile rather than a different one for each project, which means fewer conflicts and easier reviews.

### How to use it? <a class="toc" id="toc-how-to-use-it" href="#toc-how-to-use-it"></a>

Add the following in a `package.json` file. Starting from now on, we'll call this directory the "workspace root":

**package.json**

```json
{
  "private": true,
  "workspaces": ["workspace-a", "workspace-b"]
}
```

Note that the `private: true` is required! Workspaces are not meant to be published, so we've added this safety measure to make sure that nothing can accidentally expose them.

After this file has been created, create two new subfolders named `workspace-a` and `workspace-b`. In each of them, create another `package.json` file with the following content:

**workspace-a/package.json:**

```json
{
  "name": "workspace-a",
  "version": "1.0.0",

  "dependencies": {
    "cross-env": "5.0.5"
  }
}
```

**workspace-b/package.json:**

```json
{
  "name": "workspace-b",
  "version": "1.0.0",

  "dependencies": {
    "cross-env": "5.0.5",
    "workspace-a": "1.0.0"
  }
}
```

Finally, run `yarn install` somewhere, ideally inside the workspace root. If everything works well, you should now have a similar file hierarchy:

```
/package.json
/yarn.lock

/node_modules
/node_modules/cross-env
/node_modules/workspace-a -> /workspace-a

/workspace-a/package.json
/workspace-b/package.json
```

_Note: don't look for `/node_modules/workspace-b`. It won't be there unless some other package use it as a dependency._

And that's it! Requiring `workspace-a` from a file located in `workspace-b` will now use the exact code currently located inside your project rather than what is published on GitHub, and the `cross-env` package has been correctly deduped and put at the root of your project to be used by both `workspace-a` and `workspace-b`.

Please note the fact that `/workspace-a` is aliased as `/node_modules/workspace-a` via a symlink.
That's the trick that allow you to do require the package like if it was a normal one!
You also need to know that `/workspace-a/package.json#name` field is used and not the folder name.
This means that if `/workspace-a/package.json` `name` field was `"pkg-a"`, the alias will be as following:
`/node_modules/pkg-a -> /workspace-a` and you will be able to import code from `/workspace-a` with `const pkgA = require("pkg-a");` (or maybe `import pkgA from "pkg-a";`).

### How does it compare to Lerna? <a class="toc" id="toc-how-does-it-compare-to-lerna" href="#toc-how-does-it-compare-to-lerna"></a>

Yarn's workspaces are the low-level primitives that tools like Lerna can (and [do](https://github.com/lerna/lerna/pull/899)!) use. They will never try to support the high-level feature that Lerna offers, but by implementing the core logic of the resolution and linking steps inside Yarn itself we hope to enable new usages and improve performance.

### Tips & Tricks <a class="toc" id="toc-tips-tricks" href="#toc-tips-tricks"></a>

- The `workspaces` field is an array containing the paths to each workspace. Since it might be tedious to keep track of each of them, this field also accepts glob patterns! For example, Babel reference all of their packages through a single `packages/*` directive.

- Workspaces are stable enough to be used in large-scale applications and shouldn't change anything to the way the regular installs work, but if you think they're breaking something, you can disable them by adding the following line into your Yarnrc file:

  ```
  workspaces-experimental false
  ```

- If you're only making changes to a single workspace, use [--focus](/blog/2018/05/18/focused-workspaces) to quickly install sibling dependencies from the registry rather than building all of them from scratch.

### Limitations & Caveats <a class="toc" id="toc-limitations-caveats" href="#toc-limitations-caveats"></a>

- The package layout will be different between your workspace and what your users will get (the workspace dependencies will be hoisted higher into the filesystem hierarchy). Making assumptions about this layout was already hazardous since the hoisting process is not standardized, so theoretically nothing new here. If you encounter issues, try using [the `nohoist` option](/blog/2018/02/15/nohoist/)

- In the example above, if `workspace-b` depends on a different version than the one referenced in `workspace-a`'s package.json, the dependency will be installed from GitHub rather than linked from your local filesystem. This is because some packages actually need to use the previous versions in order to build the new ones (Babel is one of them).

- Be careful when publishing packages in a workspace. If you are preparing your next release and you decided to use a new dependency but forgot to declare it in the `package.json` file, your tests might still pass locally if another package already downloaded that dependency into the workspace root. However, it will be broken for consumers that pull it from a registry, since the dependency list is now incomplete so they have no way to download the new dependency. Currently there is no way to throw a warning in this scenario.

- Workspaces must be descendants of the workspace root in terms of folder hierarchy. You cannot and must not reference a workspace that is located outside of this filesystem hierarchy.

- Nested workspaces are not supported at this time.
