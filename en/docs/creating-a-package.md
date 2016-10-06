---
id: docs_creating_a_package
guide: docs_creating_a_package
layout: guide
---

{% include vars.html %}

A **package** is a directory with some code and a `package.json` file that
provides information to Yarn about your package.

Most packages use some kind of version control system. The most common one is
git but Yarn doesn't mind whatever one you choose to use. For this guide, our
examples are going to use git.

> **Note:** If you want to follow along with this guide, be sure to first
> install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
> and [Yarn]({{url_base}}/docs/install).

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
[`package.json` documentation]({{url_base}}/docs/package-json).

### Licensing and open source <a class="toc" id="toc-licensing-and-open-source" href="#toc-licensing-and-open-source"></a>

Yarn packages are generally encouraged to be
[open source](https://opensource.org/definition), however it's important to
note that they aren't inherently open source by simply publishing them.

In order for code to be open source it needs to have an open source license.
There are many open source licenses to choose from, here are a couple of common
ones:

- [MIT License](http://choosealicense.com/licenses/mit/)
- [Apache License 2.0](http://choosealicense.com/licenses/apache-2.0/)
- [GNU General Public License 3.0](http://choosealicense.com/licenses/gpl-3.0/)

If you want more options, you can get
[a more complete list here](http://choosealicense.com/licenses/).

When you select an open source license for your package, be sure to add a
`LICENSE` file in the root of your package with the license text and update
your `package.json` `license` field.

> **Note**: If you do not want your project to be licensed as an open source
> project, you should be explicit about what the licensing is or if it is
> unlicensed.

### Code sharing <a class="toc" id="toc-code-sharing" href="#toc-code-sharing"></a>

You will likely want to allow users of your package to be able to access your
source code and have a way to report issues. There are a couple of popular
websites for hosting your code:

- [GitHub](https://github.com)
- [GitLab](https://about.gitlab.com/)
- [BitBucket](https://bitbucket.org/) (Bad choice for open source projects)

These sites will allow your users to see your code, report issues, and
contribute back. Once you have your code up somewhere you should add the
following fields to your `package.json`:

```json
{
  "homepage": "https://gitlub.com/username/my-new-project",
  "bugs": "https://gitlub.com/username/my-new-project/issues",
  "repository": {
    "url": "https://gitlub.com/username/my-new-project",
    "type": "git"
  }
}
```

### Documentation <a class="toc" id="toc-documentation" href="#toc-documentation"></a>

You should ideally write your documentation before you go publishing your
package. At a minimum you should write a `README.md` file in the root of your
project that introduces your package and documents the public API.

Good documentation is defined by giving users all the knowledge they'll need to
get started with your project and continued use of it. Think about the
questions someone who knows nothing about your project will have. Describe
things accurately and as detailed as necessary, but also try to keep it brief
and easy to read. **Projects with high quality documentation are far more
successful.**

### Keep packages small <a class="toc" id="toc-keep-packages-small" href="#toc-keep-packages-small"></a>

When creating Yarn packages, you are encouraged to keep them small and simple.
Break large packages into many small ones if it makes sense to do so. This is
highly encouraged as Yarn is capable of installing hundreds or even thousands
of packages very efficiently.

Many small packages are a great model of package management. Often this leads
to smaller download sizes because you aren't bundling massive dependencies and
only using a small piece of it.

You should also consider the contents of your package. Make sure you aren't
accidentally distributing your tests or any other files that aren't necessary
for using your package (build scripts, images, etc).

Also be careful of what packages you are depending on, prefer smaller
dependencies unless you have a good reason not to. Be certain that you aren't
accidentally depending on something massive.
