---
layout     : post
title      : "Introducing Yarn Workspaces"
author     : Konstantin Raev
author_url : "https://twitter.com/bestander_nz"
date       : 2017-07-26 8:00:00
categories : announcements
share_text : "Yarn Workspaces: the evolution of multipackage projects"
---

## Monorepos

Projects tend to grow over time and occasionally some pieces of a project can be useful elsewhere.
For example, [Jest](http://facebook.github.io/jest/), being a generic test tool, gave birth to package [jest-haste-map](https://yarnpkg.com/en/package/jest-haste-map) that is now used in other projects like [metro-bunlder](https://yarnpkg.com/en/package/metro-bundler) and [kernc](https://yarnpkg.com/en/package/kernc).

Those who tried splitting a project into multiple packages know how hard it is to make changes across multiple packages at a time.
To make their lives easier some big projects adopted a [monorepo](http://www.drmaciver.com/2016/10/why-you-should-use-a-single-repository-for-all-your-companys-projects/) approach, or multi-package repositories, which makes writing code across multiple packages much easier.

A lot of  projects that JavaScript developers are using every day are managed as monorepos:

* [Jest](https://github.com/facebook/jest/tree/master/packages)
* [Babel](https://github.com/babel/babel/tree/7.0/packages)
* [React](https://github.com/facebook/react/tree/master/packages) 
* [Vue](https://github.com/vuejs/vue/tree/dev/packages)
* [Angular](https://github.com/angular/angular/tree/master/packages)

However, separating a piece of project into its own folder is not enough. 
Testing, managing dependencies and publishing multiple packages gets complicated really fast and many of such projects [adopted](https://medium.com/@bebraw/the-case-for-monorepos-907c1361708a) tools that help working with monorepos like [Lerna](https://lernajs.io/).

## Lerna

Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.
Internally it uses Yarn or npm CLI to bootstrap a project, i.e. install all third party dependencies for each package, in a nutshell Lerna calls `yarn/npm install` for each package inside the project and then creates symlinks between the packages that refer each other.

Being a wrapper of a package manager Lerna can't manipulate the contents of node_modules efficiently:

* Lerna calls `yarn install` multiple times for each package and this creates an overhead because each package.json is considered independent and they can't share dependencies with each other. This causes a lot of duplication for each node_modules folder that quite often use the same third-party packages.
* Lerna manually creates links between packages that refer each other after installation has finished. This introduces inconsistency inside node_modules that a package manager is not aware of, so running `yarn install` from within a package may break the meta structure that Lerna manages.

That is why we decided that Yarn as a package manager should not ignore multi package repositories and support them natively, **starting with Yarn 0.28 Yarn has Workspaces feature**.

## Yarn Workspaces

Yarn Workspaces is a feature that allows one package.json file (called Workspaces Root or **root **and located at the root of the project) to refer multiple other package.json files (called Workspaces or **workspaces **located under the **root** in the folder structure) and combine them together into a single meta structure during installation.

Having workspaces as a “native” Yarn feature allows Yarn to produce the best structure for Workspaces by removing third-party packages duplication across all workspaces and making installation much faster.
Yarn would also create the symlinks between the workspaces that depend on each other and Yarn will ensure folders consistency and correctness.


## Setting up Workspaces

We should start with enabling workspaces in Yarn by running the following command. 

```
yarn config set workspaces-experimental true
```

It will write line “workspaces-experimental true” to .yarnrc file in your home folder, yarn workspaces is still considered experimental while we are gathering feedback from the community.

Let's take [Jest](http://facebook.github.io/jest/) as an example and set up Yarn Workspaces for that structure.
As a matter of fact it has already been done in [this PR](https://github.com/facebook/jest/pull/3906) and Jest is already using Yarn to bootstrap the workspaces.

Jest's project structure is typical for an Open Source JavaScript monorepo.

```
`
| jest/
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ package.json
| -------- jest-diff/
| ------------ package.json
...`
```

Top level package.json defines the **root **and folders under packages folder are the packages published to npm registry, the **workspaces**.

Following is a simplified **root** package.json that enables **workspaces** for the project and defines third-party packages that are needed for the project build and test environment.

```
`{
  "private": true,
  "name": "jest",
  "devDependencies": {
    `"chalk": "^2.0.1"`
  },
  "workspaces": [
    "packages/*"
  ]
}`
```

To keep things simple I'll describe two small workspaces packages.

1. jest-matcher-utils **workspace.**

```
`{
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
}`
```

2. jest-diff **workspace** that depends on jest-matcher-utils.

```
`{
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
}`
```

An approach that a wrapper like Lerna takes is to run `yarn install` for each package.json separately and then run `yarn link` for packages that depend on each other.

We would get a folder structure like this.

```
`| jest/
| ---- node_modules/
| -------- chalk/
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ node_modules/
`| ---------------- chalk/`
`| ---------------- pretty-format/
`| ------------ package.json
| -------- jest-diff/
| ------------ node_modules/
``| ---------------- chalk/``
`````| ---------------- diff/
``````````| ---------------- jest-matcher-utils/  (symlink) -> ../jest-matcher-utils
```| ---------------- pretty-format/
``| ------------ package.json
...`
```

As you see there is a redundancy of third-party dependencies.

However, with Yarn Workspaces all node_modules are considered as one and Yarn tries to move all the packages to the root node_modules if there are no conflicts.

```
`| jest/
| ---- node_modules/
| -------- chalk/
| -------- diff/
| -------- pretty-format/
`| -------- jest-matcher-utils/  (symlink) -> ../packages/jest-matcher-utils
`| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ node_modules/
`| ---------------- chalk/`
| ------------ package.json
| -------- jest-diff/
| ------------ node_modules/
``| ---------------- chalk/``
| ------------ package.json
...`
```

Packages `diff`, `pretty-format` and symlink to `jest-matcher-utils` were hoisted to the **root** node_modules making the installation faster and smaller.
Package `chalk` could not be moved to the **root** node_modules because the **root** already depends on an different incompatible version of `chalk`.

Both of the structures above are compatible but the latter one is more optimal while still being correct from the point of view of Node.js dependency resolution.

If you run code inside `jest-diff` **workspace** it will be able to resolve all its dependencies: 

* require('chalk') resolves to `./node_modules/chalk`
* require('diff') resolves to `../../node_modules/diff`
* require('pretty-format') resolves to `../../node_modules/pretty-format`
* require('jest-matcher-utils') resolves to `../../node_modules/jest-matcher-utils`  that is a symlink to `../packages/jest-matcher-utils`

## Managing dependencies of Workspaces

If you want to add/remove/upgrade a dependency of a **workspace** just change run the appropriate command inside the **workspace** folder.

```
$ cd packages/jest-matcher-utils/
$ yarn add left-pad
✨ Done in 1.77s.
$ git status
modified: package.json
modified: ../../yarn.lock
```

Note that **workspaces** don't have yarn.lock and the **root** yarn.lock contains all the dependencies for all the **workspaces**.

## Integrating with Lerna

Do Yarn Workspaces make Lerna obsolete?

Not at all.
Lerna is much more than bootstrapping a project and it has a community of users around it that fine-tuned Lerna to work for their needs.
Instead Yarn Workspaces can be integrated with Lerna.

Starting with Lerna 2.0.0 when you pass flag [--use-workspaces](https://github.com/lerna/lerna#--use-workspaces) when running Lerna commands it will use Yarn to bootstrap the project and also it will use `package.json/workspaces` field to find the packages instead of `lerna.json/packages`.

This is how Lerna is configured for Jest:

```
{
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

Jest relies on Yarn to bootstrap the project and on Lerna to run publish command.

## What is coming next

Yarn Workspaces is the first step of what a package manager could do for managing monorepos as they become a more common solution to code sharing.

At the same time we don't want to put all the possible monorepo features into Yarn, we want to keep Yarn focused and lean and it means that Yarn and projects like Lerna could continue working together.

For Yarn our next goal is to revamp `publish` feature in Yarn.
Publishing a package to the registry is a much more important step nowadays and Yarn's basic “pack and send” approach is not enough for the modern projects.

Stay tuned. 
