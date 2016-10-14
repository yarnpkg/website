---
id: docs_cli_tag
guide: docs_cli
layout: guide
---

<p class="lead">Add, remove, or list tags on a package.</p>

### What are tags? <a class="toc" id="toc-what-are-tags" href="#toc-what-are-tags"></a>

Distribution tags (or dist-tags) are a way of marking published versions of your
package with a label. Users of your package can install it using this label
instead of a version number.

For example, if you had a **stable** release channel and a **canary** release
channel, you could use tags as a way to allow the user to type:

```sh
yarn add your-package-name@stable
yarn add your-package-name@canary
```

Different tags have different meanings:

- `latest`: The current version of the package
- `stable`: The latest stable release of the package, normally the same as
  latest unless you have Long-term Support (LTS)
- `beta`: A release before becoming latest and/or stable, used to share
  upcoming changes before they are finished.
- `canary`: A "nightly" or pre-beta release, if your project is frequently
  updated and depended on by many people you may use this to share even earlier
  code.
- `dev`: Sometimes you want to be able to test out a single revision through
  the registry while you're still working on things, this is useful for that.

Some projects will make up their own tags as they see appropriate or in
place of one of the more standard ones. Such as `next` which is used the same
as `beta`.

Although these are widely considered the "standard" tags, the only one
that has any real meaning is `latest` which is used for determining which
version to install when no version is specified.

### Caveats <a class="toc" id="toc-caveats" href="#toc-caveats"></a>

You cannot use tags that match potential version numbers since they share
a namespace:

```sh
yarn add your-package-name@<version>
yarn add your-package-name@<tag>
```

Any tag that can also be used as a valid semver range will be rejected.
For example, you cannot have a tag named `v2.3` because in semver it means
`>=2.3.0 <2.4.0`.

In general, avoid using tags that look like versions, they typically only
confuse people anyways.

### Commands <a class="toc" id="toc-commands" href="#toc-commands"></a>

##### `yarn tag add <package>@<version> <tag>` <a class="toc" id="toc-yarn-tag-add" href="#toc-yarn-tag-add"></a>

Add a tag named `<tag>` for a specific `<version>` of a `<package>`.

##### `yarn tag rm <package> <tag>` <a class="toc" id="toc-yarn-tag-rm" href="#toc-yarn-tag-rm"></a>

Remove a tag named `<tag>` from a `<package>` that is no longer in use.

> **Note:** You do not need to delete a tag before moving it to another
> version in the package. It's better not to.

##### `yarn tag ls [<package>]` <a class="toc" id="toc-yarn-tag-ls" href="#toc-yarn-tag-ls"></a>

List all of the tags for a `<package>`. If unspecified `<package>` will
default to the package you're currently inside the directory of.
