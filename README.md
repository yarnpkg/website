Yarn Website
[![Netlify Status](https://api.netlify.com/api/v1/badges/85057564-01fa-49d4-b898-30acb74ae19e/deploy-status)](https://app.netlify.com/sites/yarnpkg/deploys)
============

This repo contains the source code for the Yarn website.

In order to get started:

```sh
$ git clone git@github.com:yarnpkg/website.git yarn-website
$ cd yarn-website
```

You should ensure you have Yarn and [Bundler](http://bundler.io/) installed:

```sh
$ gem install bundler
```

And then:

```sh
$ make
```

Or:

```sh
$ make install
$ make serve
```

On Windows, `make` is not available, so you need to execute `bundle` and `jekyll` directly:

```sh
bundle install
bundle exec jekyll serve --incremental
```

---

**Special thanks to [Netlify](https://www.netlify.com/) for powering the website.**
