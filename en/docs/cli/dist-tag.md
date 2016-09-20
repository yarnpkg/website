---
id: docs_cli_dist_tag
guide: docs_cli
layout: guide
---

Add, remove, or list dist-tags on a package.

### What are dist-tags?

Distribution tags or dist-tags are a way of marking published versions of your
package with a label. Users of your package can install it using this label
instead of a version number.

For example, if you had a **stable** release channel and a **canary** release
channel, you could use dist-tags as a way to allow the user to type:

```sh
$ yarn install your-package-name@stable
$ yarn install your-package-name@canary
```

Different dist-tags have different meanings:

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

Some projects will make up their own dist-tags as they see appropriate or in
place of one of the more standard ones. Such as `next` which is used the same
as `beta`.

Although these are widely considered the "standard" dist-tags, the only one
that has any real meaning is `latest` which is used for determining which
version to install when no version is specified.

### Caveats

You cannot use dist-tags that match potential version numbers since they share
a namespace:

```sh
$ yarn install your-package-name@<version>
$ yarn install your-package-name@<dist-tag>
```

Any dist-tag that can also be used as a valid semver range will be rejected.
For example, you cannot have a dist-tag named `v2.3` because in semver it means
`>=2.3.0 <2.4.0`.

In general, avoid using dist-tags that look like versions, they typically only
confuse people anyways.

### Commands

##### `yarn dist-tag add <package>@<version> <tag>`

Add a dist-tag named `<tag>` for a specific `<version>` of a `<package>`.

##### `yarn dist-tag rm <package> <tag>`

Remove a dist-tag named `<tag>` from a `<package>` that is no longer in use.

> **Note:** You do not need to delete a tag before moving it to another
> version in the package. It's better not to.

##### `yarn dist-tag ls [<package>]`

List all of the dist-tags for a `<package>`. If unspecified `<package>` will
default to the package you're currently inside the directory of.
