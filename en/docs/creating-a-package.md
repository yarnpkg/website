---
id: docs_creating_a_package
guide: docs_creating_a_package
layout: guide
---

A **package** is a directory with some code and a `package.json` file that
provides information to Yarn about your package.

Most packages use some kind of version control system. The most common one is
git but Yarn doesn't mind whatever one you choose to use. For this guide, our
examples are going to use git.

> **Note:** If you want to follow along with this guide, be sure to first
> install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
> and [Yarn](install).

### Creating your first package <a class="toc" id="toc-creating-your-first-package" href="#toc-creating-your-first-package"></a>

In order to create your first package, open up your system terminal/console and
run the following commands:

```sh
git init my-new-project
cd my-new-project
yarn init
```

This is going to create a new git repository, put you inside of it, and then
open up an interactive form for creating a new yarn project with the following
questions:

```sh
name (my-new-project):
version (1.0.0):
description:
entry point (index.js):
git repository:
author:
license (MIT):
```

You can type answers for each of these or you can just hit enter/return to use
the default or leave it blank.

> **Tip:** If you want to use the defaults for everything you can also run
> `npm init --yes` and it will skip all the questions.

### `package.json` <a class="toc" id="toc-package-json" href="#toc-package-json"></a>

Now you should have a `package.json` that looks similar to this:

```json
{
  "name": "my-new-project",
  "version": "1.0.0",
  "description": "My New Project description.",
  "main": "index.js",
  "repository": {
    "url": "https://example.com/your-username/my-new-project",
    "type": "git"
  },
  "author": "Your Name <you@example.com>",
  "license": "MIT"
}
```

The fields you see in the `package.json` have the following meanings:

- **name** is the identifier of your package, if you are going to publish it to
  the global registry, you need to be sure that it is unique.
- **version** is the semver-compatible version of your package, you can publish
  a package as much as you want but they must have new versions.
- **description** is an optional but recommended field that gets used by other
  Yarn users to search for and understand your project.
- **main** is used to define the entry point of your code used by programs like
  Node.js. If unspecified it will default to `index.js`.
- **repository** is another optional but recommended field that helps users of
  your package find the source code to contribute back.
- **author** is the creator or maintainer of a package. It follows the format
  `"Your Name <you@example.com> (http://your-website.com)"`
- **license** is the published legal terms of your package and what is the
  allowed usage of the code in your package.

When you run `yarn init`, all it is doing is creating this file, nothing
happens in the background. You can feel free to edit this file as much as you
want.

#### Additional fields <a class="toc" id="toc-additional-fields" href="#toc-additional-fields"></a>

Let's go through some additional `package.json` fields you might want to add.

```json
{
  "name": "my-new-project",
  "...": "...",
  "keywords": ["cool", "useful", "stuff"],
  "homepage": "https://my-new-project-website.com",
  "bugs": "https://github.com/you/my-new-project/issues",
  "contributors": [
    "Your Friend <their-email@example.com> (http://their-website.com)",
    "Another Friend <another-email@example.com> (https://another-website.org)"
  ],
  "files": [
    "index.js",
    "lib/*.js",
    "bin/*.js"
  ],
  "bin": {
    "my-new-project-cli": "bin/my-new-project-cli.js"
  }
}
```

- **keywords** is a list of terms that other developers can search for to find
  your package or related packages.
- **homepage** is a url to point users to a website that informs them on the
  package with an introduction, documentations, and links to additional
  resources.
- **bugs** is a url to point users of your package to if they discover an issue
  with your package.
- **contributors** is a list of contributors to the package. If there are other
  people involved in your project, you can specify them here.
- **files** is a list of files that should be included in your package when
  published and installed. If unspecified Yarn will include every file.
- **bin** is a mapping of cli commands (binaries) for Yarn to create for the
  package when installing it.

For a complete list of all the `package.json` fields and more details about
each of the above fields please see the
[`package.json` documentation](package-json).
