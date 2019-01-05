---
layout     : post
title      : "Workspaces in Yarn"
author     : Konstantin Raev
author_url : "https://twitter.com/bestander_nz"
date       : 2017-08-02 8:00:00
categories : announcements
share_text : "Yarn Workspaces: the evolution of multipackage projects"
---

Projects tend to grow over time, and, occasionally, some pieces of a project can be useful elsewhere in other projects. For example, [Jest](http://facebook.github.io/jest/), being a generic testing tool, gave birth to many packages, one of them is [jest-snapshot](https://yarnpkg.com/en/package/jest-snapshot) that is now used in other projects like [snapguidist](https://yarnpkg.com/en/package/snapguidist) and [chai-jest-snapshot](https://yarnpkg.com/en/package/chai-jest-snapshot).

## Monorepos

Those who have [tried splitting a project into multiple packages](https://youtu.be/PvabBs_utr8?t=16m24s) know how hard it is to make changes across multiple packages at one time. To make the process easier, some big projects adopted a [monorepo](http://www.drmaciver.com/2016/10/why-you-should-use-a-single-repository-for-all-your-companys-projects/) approach, or multi-package repositories, which reduces the burden of writing code across packages.

Several projects used every day by JavaScript developers are managed as monorepos: [Babel](https://github.com/babel/babel/tree/master/packages), [React](https://github.com/facebook/react/tree/master/packages), [Jest](https://github.com/facebook/jest/tree/master/packages), [Vue](https://github.com/vuejs/vue/tree/dev/packages), [Angular](https://github.com/angular/angular/tree/master/packages).

However, separating pieces of projects into their own folders is sometimes not enough. Testing, managing dependencies, and publishing multiple packages quickly gets complicated and many such projects [adopt](https://medium.com/@bebraw/the-case-for-monorepos-907c1361708a) tools such as [Lerna](https://lernajs.io/) to make working with monorepos easier.

## Lerna

Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm. Internally it uses [Yarn](https://code.facebook.com/posts/1840075619545360) or the npm CLI to bootstrap (i.e. install all third party dependencies for each package) a project. In a nutshell, Lerna calls `yarn/npm install` for each package inside the project and then creates symlinks between the packages that refer each other.

Being a wrapper of a package manager, Lerna can't manipulate the contents of node_modules efficiently:

- Lerna calls `yarn install` multiple times for each package which creates overhead because each `package.json` is considered independent and they can't share dependencies with each other. This causes a lot of duplication for each node_modules folder which quite often use the same third-party packages.
- Lerna manually creates links between packages that refer each other after installation has finished. This introduces inconsistency inside node_modules that a package manager may not be aware of, so running `yarn install` from within a package may break the meta structure that Lerna manages.

Issues such as these convinced us, as package manager developers, that we should support multi-package repositories directly in Yarn. **Starting with [Yarn 0.28,](https://yarnpkg.com/en/docs/install) we're excited to share that we support such repositories under the Workspaces feature**.

## Introducing Yarn Workspaces

Yarn Workspaces is a feature that allows users to install dependencies from multiple package.json files in subfolders of a single root package.json file, all in one go.

Making Workspaces native to Yarn enables faster, lighter installation by preventing package duplication across Workspaces. Yarn can also create symlinks between Workspaces that depend on each other, and will ensure the consistency and correctness of all directories.

## Setting up Workspaces

To get started, users must enable Workspaces in Yarn by running the following command:

```
yarn config set workspaces-experimental true
```

It will add `workspaces-experimental true` to the `.yarnrc` file in your OS home folder. Yarn Workspaces is still considered experimental while we gather feedback from the community.

Let's take [Jest](http://facebook.github.io/jest/) as an example and set Yarn Workspaces up for that structure. As a matter of fact, it has already been [done in a PR](https://github.com/facebook/jest/pull/3906), and Jest has been using Yarn to bootstrap its packages for a while.

Jest's project structure is typical for an Open Source JavaScript monorepo.

```
| jest/
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ package.json
| -------- jest-diff/
| ------------ package.json
...
```

The top-level `package.json` defines the root of the project, and folders with other package.json files are the Workspaces.
Workspaces usually are published to a registry like npm.
While the root is not supposed to be consumed as a package, it usually contains the glue code or business specific code that is not useful for sharing with other projects, that is why we mark it as “private”.

The following example is a simplified root `package.json` that enables Workspaces for the project and defines third-party packages needed for the project build and test environment.

```
{
  "private": true,
  "name": "jest",
  "devDependencies": {
    "chalk": "^2.0.1"
  },
  "workspaces": [
    "packages/*"
  ]
}
```

To keep things simple I'll describe two small Workspaces packages:

1.  jest-matcher-utils Workspace:

    ```
    {
      "name": "jest-matcher-utils",
      "description": "...",
      "version": "20.0.3",
      "license": "...",
      "main": "...",
      "browser": "...",
      "dependencies": {
        "chalk": "^1.1.3",
        "pretty-format": "^20.0.3"
      }
    }
    ```

2.  jest-diff Workspace that depends on jest-matcher-utils:

    ```
    {
      "name": "jest-diff",
      "version": "20.0.3",
      "license": "...",
      "main": "...",
      "browser": "...",
      "dependencies": {
        "chalk": "^1.1.3",
        "diff": "^3.2.0",
        "jest-matcher-utils": "^20.0.3",
        "pretty-format": "^20.0.3"
      }
    }
    ```

A wrapper like Lerna would first run `yarn install` for each `package.json` separately and then run `yarn link` for packages that depend on each other.

If we used that approach, we would get a folder structure like the following:

```
| jest/
| ---- node_modules/
| -------- chalk/
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ node_modules/
| ---------------- chalk/
| ---------------- pretty-format/
| ------------ package.json
| -------- jest-diff/
| ------------ node_modules/
| ---------------- chalk/
| ---------------- diff/
| ---------------- jest-matcher-utils/  (symlink) -> ../jest-matcher-utils
| ---------------- pretty-format/
| ------------ package.json
...
```

As you see, there is a redundancy of third-party dependencies.

With Workspaces enabled, Yarn can produce a much more optimized dependency structure and when you run the usual `yarn install` anywhere in the project you'll get the following node_modules.

```
| jest/
| ---- node_modules/
| -------- chalk/
| -------- diff/
| -------- pretty-format/
| -------- jest-matcher-utils/  (symlink) -> ../packages/jest-matcher-utils
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ node_modules/
| ---------------- chalk/
| ------------ package.json
| -------- jest-diff/
| ------------ node_modules/
| ---------------- chalk/
| ------------ package.json
...
```

Packages like `diff`, `pretty-format` and the symlink to `jest-matcher-utils` were hoisted to the root node_modules directory, making the installation faster and smaller. The package `chalk` however could not be moved to the root because the root already depends on a different, incompatible version of `chalk`.

Both of the structures above are compatible, but the latter is more optimal while still being correct regarding the Node.js module resolution logic.

For avid Lerna users this is similar to bootstrapping code via the `--hoist` flag.

If you run code inside the `jest-diff` Workspace, it will be able to resolve all its dependencies:

- require('chalk') resolves to `./node_modules/chalk`
- require('diff') resolves to `../../node_modules/diff`
- require('pretty-format') resolves to `../../node_modules/pretty-format`
- require('jest-matcher-utils') resolves to `../../node_modules/jest-matcher-utils` that is a symlink to `../packages/jest-matcher-utils`

## Managing dependencies of Workspaces

If you want to modify a dependency of a Workspace, just run the appropriate command inside the Workspace folder:

```
$ cd packages/jest-matcher-utils/
$ yarn add left-pad
✨ Done in 1.77s.
$ git status
modified: package.json
modified: ../../yarn.lock
```

Note that Workspaces don't have their own yarn.lock files, and the root yarn.lock contains all the dependencies for all the Workspaces.
When you want to change a dependency inside a Workspace, the root yarn.lock will be changed as well as the Workspace's package.json.

## Integrating with Lerna

Do Yarn Workspaces make Lerna obsolete?

Not at all. Yarn Workspaces are easily integrated with Lerna.

Lerna provides a lot more than just bootstrapping a project and it has a community of users around it that have fine-tuned Lerna for their needs.

Starting with Lerna 2.0.0, when you pass the flag [`--use-workspaces`](https://github.com/lerna/lerna#--use-workspaces) when running Lerna commands, it will use Yarn to bootstrap the project and also it will use `package.json/workspaces` field to find the packages instead of `lerna.json/packages`.

This is how Lerna is configured for Jest:

```
{
  "lerna": "2.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

Jest relies on Yarn to bootstrap the project, and on Lerna for running the publish command(s).

## What is next?

Yarn Workspaces is the first step of what a package manager could do for managing monorepos as they become a more common solution to code sharing.

At the same time we don't want to put all the possible monorepo features into Yarn. We want to keep Yarn focused and lean, and this means that Yarn and projects like Lerna will continue working together.

Our next goal is to finalize Yarn 1.0, which is meant to summarize the work we have done on Yarn over the past year, and recognizing how reliable Yarn has become. We'll also share our thoughts on what we'd like to build next for Yarn then.

Stay tuned.
