---
layout     : post
title      : "Ease the Transition to a Monorepo with Focused Workspaces"
author     : Bryan Wain
author_url : "https://github.com/bdwain"
date       : 2018-05-18 00:00:00
categories : announcements
share_text : "Ease the Transition to a Monorepo with Focused Workspaces"
---

[Previously](/blog/2017/08/02/introducing-workspaces/), we wrote about monorepos and how Yarn Workspaces makes working with them simpler. Unfortunately, moving to a monorepo is not always an easy choice. Without the right tooling, a monorepo can often harm the developer experience instead of help it.

## The Problem With Monorepos

One of the main reasons projects usually move to a monorepo is because they make it easier to make changes across multiple packages by allowing you make those changes in a single pull request. One of the ways Yarn Workspaces improves this workflow is by automatically symlinking sibling package dependencies in the node_modules folder, allowing you to immediately see the results of a change to one package when working on another.

Unfortunately, while symlinking sibling packages all of the time makes cross-package development easier, it comes with a big downside when you want to work on a single package. If package `A` depends on packages `B` and `C`, you need to build all three packages just to make a change in package `A`. In a monorepo with many packages, this can be a very slow process compared to a multirepo setup, where you would just pull down a pre-built version of `B` and `C` when you install.

These opposing benefits of monorepo and multirepo development often leave developers with a difficult choice. Optimize for cross-package development with a monorepo or optimize for single-package development with many repos. We feel that this is a choice you should not have to make, and our goal with focused workspaces was to help turn Yarn Workspaces into a tool that gives you the full benefits of a monorepo without forcing you to give up the benefits of multiple repos.

## Introducing Focused Workspaces

`yarn install --focus` is a new installation option available in **1.7.0** that shallowly installs a workspace's sibling dependencies under its `node_modules` folder. Shallow installation can best be explained with an example.

Imagine you have a monorepo with packages `A` and `B`, where `A` depends on `B`, and `B` depends on `External`, which is not part of the monorepo. A normal installation might result in something like this:

```
| my_project/
|      package.json
|      node_modules/
|          A/ (symlink to packages/A)
|          B/ (symlink to packages/B)
|          External/
|      packages/
|          A/
|              node_modules/ (empty)
|          B/
|              node_modules/ (empty)
```

The problem here is that if you want to run `A`, you need to build `B` as well. If you haven't made any changes to `B`, this is most likely going to be slower than installing `B` from the registry.

If you were to go to `packages/A` and run `yarn install --focus` instead, the result would look like this:

```
| my_project/
|      package.json
|      node_modules/
|          A/ (symlink to packages/A)
|          B/ (symlink to packages/B)
|          External/
|      packages/
|          A/
|              node_modules/
|                  B/ (not a symlink. Pulled from registry. No need to build.)
|          B/
|              node_modules/ (empty)
```

This allows you to run `A` without rebuilding `B`. Because of the way node module resolution works, when building `A`, it will find `B` in `packages/A/node_modules/B` and avoid using the symlink at the root, which points to an unbuilt version of `B`.

Yarn will always do a minimal install when using `--focus`. Note that `External` is not reinstalled under `A`. There is no need because when `A` tries to resolve `External`, it will already point at the hoisted version.

#### Dealing With Version Conflicts

Let's look at a slightly more complicated example. Imagine now that both `A` and `B` depend on `External`, but `A` depends on `External@1.0.0` and `B` depends on `External@2.0.0`. `A` and `B` can no longer share a copy of `External` because their versions are incompatible.

A regular install would produce this:

```
| my_project/
|      package.json
|      node_modules/
|          A/ (symlink to packages/A)
|          B/ (symlink to packages/B)
|          External/ (v2)
|      packages/
|          A/
|              node_modules/
|                  External (v1)
|          B/
|              node_modules/ (empty)
```

and a focused install would produce this:

```
| my_project/
|      package.json
|      node_modules/
|          A/ (symlink to packages/A)
|          B/ (symlink to packages/B)
|          External/ (v2)
|      packages/
|          A/
|              node_modules/
|                  External (v1)
|                  B/
|                      node_modules/
|                          External/ (v2)
|          B/
|              node_modules/ (empty)
```

Yarn needs to not only install `B` under `A`, but also install `External` under the nested copy of `B` to ensure that `B` uses v2 of `External` while `A` still uses v1.

#### Unfocusing

If you want to remove the shallow installations from a focused install, just rerun `yarn install` without `--focus`. All `node_modules` will return to the state they were in before you focused. `upgrade`, `add`, and `remove` will also remove any shallow installations.

You can also focus on another workspace and the original workspace will unfocus.

#### Focusing by Default

If you would like to have a workspace always use `--focus` when installing, you can use the [CLI arguments](/lang/en/docs/yarnrc#toc-cli-arguments) feature of `.yarnrc` files.

```
--install.focus true
```

If you add that to `packages/A/.yarnrc`, you will always do a focused install when you run install from `A`, but not from any other packages or the root.

If you instead add it to `packages/.yarnrc`, you will do a focused install from all packages under `packages/`.

## What's Next?

We hope focused workspaces helps make your migration to a monorepo easier. This is only a first iteration and further improvements will likely be made in the future. If you notice anything wrong or have any suggestions on how we can improve your experience with workspaces, please let us know.

## References

* Original Proposal: [RFC](https://github.com/yarnpkg/rfcs/blob/master/implemented/0000-focused-workspaces.md)
* Implementation PR: [#5663](https://github.com/yarnpkg/yarn/pull/5663)
