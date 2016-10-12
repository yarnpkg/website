---
id: docs_dependency_types
guide: docs_dependencies
layout: guide
---

Dependencies serve many different purposes. Some dependencies are needed to
build your project, others are needed when your running your program. As such
there are a number of different types of dependencies that you can have (e.g.
`dependencies`, `devDependencies`, and `peerDependencies`).

Your `package.json` will contain all of these dependencies:

```json
{
  "name": "my-project",
  "dependencies": {
    "package-a": "^1.0.0"
  },
  "devDependencies": {
    "package-b": "^1.2.1"
  },
  "peerDependencies": {
    "package-c": "^2.5.4"
  },
  "optionalDependencies": {
    "package-d": "^3.1.0"
  }
}
```

Most people only have `dependencies` and `devDependencies`, but each of these
are important to understand.

##### `dependencies` <a class="toc" id="toc-dependencies" href="#toc-dependencies"></a>

These are your normal dependencies, or rather ones that you need when running
your code (e.g. React or ImmutableJS).

##### `devDependencies` <a class="toc" id="toc-devdependencies" href="#toc-devdependencies"></a>

These are your development dependencies. Dependencies that you need at some
point in the development workflow but not while running your code (e.g. Babel
or Flow).

##### `peerDependencies` <a class="toc" id="toc-peerdependencies" href="#toc-peerdependencies"></a>

Peer dependencies are a special type of dependency that would only ever come up
if you were publishing your own package.

Having a peer dependency means that your package needs a dependency that is the
same exact dependency as the person installing your package. This is useful for
packages like `react` that need to have a single copy of `react-dom` that is
also used by the person installing it.

##### `optionalDependencies` <a class="toc" id="toc-optionaldependencies" href="#toc-optionaldependencies"></a>

Optional dependencies are just that: optional. If they fail to install, Yarn
will still say the install process was successful.

This is useful for dependencies that won't necessarily work on every machine
and you have a fallback plan in case they are not installed (e.g. Watchman).

##### `bundledDependencies` <a class="toc" id="toc-bundleddependencies" href="#toc-bundleddependencies"></a>

<!-- [TODO: Explain bundledDependencies in relation to other types] -->
<!-- Array of package names that will be bundled when publishing the package. -->
