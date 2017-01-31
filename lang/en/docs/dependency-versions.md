---
id: docs_dependency_versions
guide: docs_dependencies
description: docs_dependency_versions_description
layout: guide
---

## Semantic Versioning <a class="toc" id="toc-semantic-versioning" href="#toc-semantic-versioning"></a>

Packages in Yarn follow [Semantic Versioning](http://semver.org/), also known
as "semver". When you install a new package from the registry it will be added
to your `package.json` with a semver version range.

These versions are broken down into `major.minor.patch` and looks like one of
these: `3.14.1`, `0.42.0`, `2.7.18`. Each part of the version gets incremented
at various times:

- Increment `major` when you make a **breaking** or **incompatible** change to
  the API of a package.
- Increment `minor` when you add **new functionality** while staying
  **backwards-compatible**
- Increment `patch` when you make **bug fixes** while staying
  **backwards-compatible**

> **Note:** There are also sometimes "labels" or "extensions" to the semver
> format that mark things like pre-releases or betas (e.g. `2.0.0-beta.3`)

When developers talk about two semver versions being "compatible" with one
another they are referring to the **backwards-compatible** changes (`minor` and
`patch`).

## Version ranges <a class="toc" id="toc-version-ranges" href="#toc-version-ranges"></a>

When you want to specify a dependency you specify its name and a
**version range** in your `package.json` like one of these:

```json
{
  "dependencies": {
    "package-1": ">=2.0.0 <3.1.4",
    "package-2": "^0.4.2",
    "package-3": "~2.7.1"
  }
}
```

You'll notice that we have a bunch of characters separate from the version.
These characters, `>=`, `<`, `^`, and `~`, are **operators** and they are used
to specify **version ranges**.

The purpose of a version range is to specify which versions of a dependency
will work for your code.

#### Comparators <a class="toc" id="toc-comparators" href="#toc-comparators"></a>

Each version range is made up of **comparators**. These comparators are simply
an _operator_ followed by a _version_. Here are some of the basic operators:

| Comparator | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `<2.0.0`   | Any version that is ***less than*** `2.0.0`                 |
| `<=3.1.4`  | Any version that is ***less than or equal to*** `3.1.4`     |
| `>0.4.2`   | Any version that is ***greater than*** `0.4.2`             |
| `>=2.7.1`  | Any version that is ***greater than or equal to*** `2.7.1` |
| `=4.6.6`   | Any version that is ***equal to*** `4.6.6`                  |

> **Note**: If no operator is specified, then `=` is assumed in the version
> range. So the `=` operator is effectively optional.

#### Intersections <a class="toc" id="toc-intersections" href="#toc-intersections"></a>

Comparators can be joined by whitespace to create a **comparator set**. This
creates an **intersection** of the comparators it includes. For example, the
comparator set `>=2.0.0 <3.1.4` means _"Greater than or equal to `2.0.0`
**and** less than `3.1.4`"_.

#### Unions <a class="toc" id="toc-unions" href="#toc-unions"></a>

A full version range can include a **union** of multiple comparator sets joined
together by `||`. If either side of the union is satisfied, then the whole
version range is satisfied. For example, the version range `<2.0.0 || >3.1.4`
means _"Less than `2.0.0` **or** greater than `3.1.4`"_.

#### Pre-release tags <a class="toc" id="toc-pre-release-tags" href="#toc-pre-release-tags"></a>

Versions can also have **pre-release tags** (e.g. `3.1.4-beta.2`). If a
comparator includes a version with a pre-release tag it will only match against
versions that have the same `major.minor.patch` version.

For example, the range `>=3.1.4-beta.2` would match `3.1.4-beta.2` or
`3.1.4-beta.12`, but would *not* match `3.1.5-beta.1` even though it is
_technically_ "greater than or equal to" (`>=`) the `3.1.4-beta.2` version.

Pre-releases tend to contain accidental breaking changes and usually you do not
want to match pre-releases outside of the version you have specified so this
behavior is useful.

#### Advanced version ranges <a class="toc" id="toc-advanced-version-ranges" href="#toc-advanced-version-ranges"></a>

##### Hyphen Ranges <a class="toc" id="toc-hyphen-ranges" href="#toc-hyphen-ranges"></a>

Hyphen ranges (e.g. `2.0.0 - 3.1.4`) specify an _inclusive_ set. If part of the
version is left out (e.g. `0.4` or `2`) then they are filled in with zeroes.

| Version range   | Expanded version range |
| --------------- | ---------------------- |
| `2.0.0 - 3.1.4` | `>=2.0.0 <=3.1.4`      |
| `0.4 - 2`       | `>=0.4.0 <=2.0.0`      |

##### X-Ranges <a class="toc" id="toc-x-ranges" href="#toc-x-ranges"></a>

Any of `X`, `x`, or `*` can be used to leave part or all of a version
unspecified.

| Version range     | Expanded version range                           |
| ----------------- | ------------------------------------------------ |
| `*`               | `>=0.0.0` (any version)                          |
| `2.x`             | `>=2.0.0 <3.0.0` (match major version)           |
| `3.1.x`           | `>=3.1.0 <3.2.0` (match major and minor version) |

If part of a version is left out, it is assumed to be an x-range.

| Version range      | Expanded version range      |
| ------------------ | --------------------------- |
| ` ` (empty string) | `*` or `>=0.0.0`            |
| `2`                | `2.x.x` or `>=2.0.0 <3.0.0` |
| `3.1`              | `3.1.x` or `>=3.1.0 <3.2.0` |

##### Tilde Ranges <a class="toc" id="toc-tilde-ranges" href="#toc-tilde-ranges"></a>

Using `~` with a minor version specified allows `patch` changes. Using `~` with
only major version specified will allow `minor` changes.

| Version range      | Expanded version range      |
| ------------------ | --------------------------- |
| `~3.1.4`           | `>=3.1.4 <3.2.0`            |
| `~3.1`             | `3.1.x` or `>=3.1.0 <3.2.0` |
| `~3`               | `3.x` or `>=3.0.0 <4.0.0`   |

> **Note:** Specifying pre-releases in tilde ranges will only match
> pre-releases in that same full version. For example, the version range
> `~3.1.4-beta.2` would match against `3.1.4-beta.4` but not `3.1.5-beta.2`
> because the `major.minor.patch` version is different.

##### Caret Ranges <a class="toc" id="toc-caret-ranges" href="#toc-caret-ranges"></a>

Allow changes that do not modify the first non-zero digit in the version,
either the `3` in `3.1.4` or the `4` in `0.4.2`.

| Version range      | Expanded version range |
| ------------------ | ---------------------- |
| `^3.1.4`           | `>=3.1.4 <4.0.0`       |
| `^0.4.2`           | `>=0.4.2 <0.5.0`       |
| `^0.0.2`           | `>=0.0.2 <0.0.3`       |

> **Note:** By default when you run `yarn add [package-name]` it will use a
> caret range.

If part of the version is left out, the missing parts are filled in with
zeroes. However, they will still allow for that value to be changed.

| Version range      | Expanded version range |
| ------------------ | ---------------------- |
| `^0.0.x`           | `>=0.0.0 <0.1.0`       |
| `^0.0`             | `>=0.0.0 <0.1.0`       |
| `^0.x`             | `>=0.0.0 <1.0.0`       |
| `^0`               | `>=0.0.0 <1.0.0`       |

### More resources <a class="toc" id="toc-more-resources" href="#toc-more-resources"></a>

- For a full specification of how this versioning system works see the
[`node-semver` README](https://github.com/npm/node-semver).
- Test out this versioning system on actual packages using the
[npm semver calculator](https://semver.npmjs.com/).
