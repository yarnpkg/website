---
layout     : post
title      : "Yarn import now uses package-lock.json"
author     : Aram Drevekenin
author_url : "https://github.com/imsnif"
date       : 2018-06-04 08:00:03
categories : announcements
share_text : "Yarn import now uses package-lock.json"
---

For a while now, the JavaScript ecosystem is a host to a few different dependency lock file formats, including yarn’s `yarn.lock` and npm’s `package-lock.json`.

We are quite excited to announce that as of `1.7.0` yarn is [able to import](https://github.com/yarnpkg/yarn/pull/5745) its dependency tree from npm’s `package-lock.json` natively, without external tools or clunky processes.

This will no doubt come as great news for developers working in mixed npm/yarn environments or wanting to try yarn out on existing projects.

All you need to do is issue the `yarn import` command in a repository with a `package-lock.json` file, and yarn will use the resolution information from the existing `package-lock.json` file and a corresponding `yarn.lock` file will be created.

This feature is one of the first fruits of a continuing collaboration between the maintainers of the two package managers. We feel strongly about the two tools being aware of each other and providing an easy transition path between them. If you are interested or want to help, head over to [the related GitHub issue](https://github.com/yarnpkg/yarn/issues/5654).

## How does it work under the hood

Previously, `yarn import` would rely on a package's `node_modules` directory to determine the fixed versions to which the the new yarn.lock file needs to resolve its semver ranges. Now, it falls back to this behaviour if it cannot find a `package-lock.json` file.

When it does, yarn creates a dependency tree using [npm-logical-tree](https://github.com/npm/logical-tree) from the `package.json` and `package-lock.json` in the project's root directory. It then uses the fixed versions in that tree to create its own `yarn.lock` lockfile.
The resulting `yarn.lock` will have all the exact fixed versions specified in `package-lock.json`. Ready to be installed and committed in your repository.

## Limitations

The two lockfile formats and contents are different. Each have their own priorities, [guarantees and trade-offs in terms of determinism, consistency and more](https://yarnpkg.com/blog/2017/05/31/determinism/). Since `yarn.lock` chooses only to store the logical dependency tree, preferring to future-proof for potential physical tree and hoisting optimizations, there are certain nuances that `package-lock.json` expresses that `yarn.lock` cannot.

One example would be:

    // package-lock.json (slightly simplified for clarity)
    {
      "name": "nuanced-dependency-tree",
      "dependencies": {
        "a": {
          "version": "9.9.9",
          "requires": {
            "c": "^1.0.0"
          },
          "dependencies": {
            "c": {
              "version": "1.0.1"
            }
          }
        },
        "b": {
          "version": "8.8.8",
          "requires": {
            "c": "^1.0.0"
          }
        },
        "c": {
          "version": "1.0.5"
        }
      }
    }

Here, we have both packages `a` and `b` which require the same semver range of package `c`: `^1.0.0` and get different versions: `1.0.1` and `1.0.5` respectively.

This would be imported to yarn as:

    // yarn.lock (slightly simplified for clarity)
    a@9.9.9
      version "9.9.9"
      dependencies:
        c "^1.0.0"

    b@8.8.8
      version "8.8.8"
      dependencies:
        c "^1.0.0"

    c@^1.0.0
      version "1.0.5"

Here `b`'s dependency `c` would change its locked version from `1.0.1` to `1.0.5` because `yarn.lock` cannot express this duplication. Yarn chooses and aims to have a single resolved version for all compatible version ranges. While in most cases such minor changes should not have much effect - we encourage you to use this feature with care. You can still override ranges if you need to, using [the selective version resolutions feature in yarn](https://yarnpkg.com/en/docs/selective-version-resolutions/).

## Future plans

Currently, we’re planning to add some warnings to users who use both `yarn` and `npm` in the same repository to install packages. If there’s a need, we might also try to expand this feature to other lock file formats. If you’d like to point out other issues of interoperability, or try your hand at fixing them - we encourage you to [file an issue](https://github.com/yarnpkg/yarn/issues/new) or better, [fix one](https://github.com/yarnpkg/yarn/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+label%3Ahigh-priority) by sending a PR.

_We highly recommend you to delete the `package-lock.json` file if you decide to use yarn in order to avoid future confusion and possible consistency issues_.
