---
id: contributing
guide: yarn_organization
layout: guide
---

{% include vars.html %}

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct]({{url_base}}/org/code-of-conduct).

## Find things to work on

We label issues that we need help with the `help wanted` tag. We also categorize them with the following tags:

- cat-bug
- cat-feature
- cat-chore
- cat-performance

These are the main categories that you can work on. We further mark issues with a `high-priority` tag or a `good first issue` tag to indicate their importance to the project and subjective level of easiness to get started on respectively. If you don't see the `triaged` tag or you see any of the `needs-confirmation`, `needs-repro-script`, `needs-discussion` tags, it may not be wise to start working on these issues.

Here are a few quick links to get you started:

- [Good first bugs](https://github.com/yarnpkg/yarn/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22+label%3Atriaged+label%3Acat-bug+label%3A%22good+first+issue%22)
- [Good first features](https://github.com/yarnpkg/yarn/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20label%3A%22help%20wanted%22%20label%3Atriaged%20label%3Acat-feature%20label%3A%22good%20first%20issue%22%20)
- [High impact issue that need help](https://github.com/yarnpkg/yarn/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22+label%3Ahigh-priority+label%3Atriaged)
- [Issues need reproduction scripts](https://github.com/yarnpkg/yarn/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20label%3A%22needs-repro-script%22)
- [Issues need triaging](https://github.com/yarnpkg/yarn/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20-label%3Atriaged)

If you would like to start triaging issues, one easy way to get started is to [subscribe to yarn on CodeTriage](https://www.codetriage.com/yarnpkg/yarn).

## Setup <a class="toc" id="toc-setup" href="#toc-setup"></a>

1. Ensure Node.js 4+ and a non-development version of Yarn are installed.
1. Git clone the [Yarn repository](https://github.com/yarnpkg/yarn).
1. From the root of the repository, run `yarn` to install the dependencies required for development.

## Building <a class="toc" id="toc-building" href="#toc-building"></a>

Perform a one-off build using:

```sh
yarn build
```

Or to automatically rebuild as changes are made, use:

```sh
yarn watch
```

## Testing Your Changes Locally <a class="toc" id="toc-local-testing" href="#toc-local-testing"></a>

You can modify the following command to allow you to test your changes locally such that it doesn't override an existing installation of `yarn`.

1.  Navigate to the folder for yarn that you cloned from GitHub
1.  Run `alias yarn-local="node $PWD/lib/cli/index.js"`. This will map `yarn-local` to the `index.js` file in your current working directory.

You can now proceed to run `yarn watch` in one tab, and test with `yarn-local` in the other.

## Testing <a class="toc" id="toc-testing" href="#toc-testing"></a>

First follow the building instructions above.

Then to run both the linters and tests, use:

```sh
yarn test
```

Or to run them separately, use:

```sh
yarn lint
```

```sh
yarn test-only
```

## Pull Requests <a class="toc" id="toc-pull-requests" href="#toc-pull-requests"></a>

We actively welcome your pull requests.

1.  Fork the repo and create your branch from `master`.
2.  If you've added code that should be tested, add tests.
3.  If you've changed APIs, update the documentation.
4.  Ensure the test suite passes.
5.  Make sure your code lints.

## License <a class="toc" id="toc-license" href="#toc-license"></a>

By contributing to Yarn, you agree that your contributions will be licensed
under its [BSD license](https://github.com/yarnpkg/yarn/blob/master/LICENSE).
