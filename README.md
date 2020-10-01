Yarn  the master Website
[![Netlify Status](https://api.netlify.com/api/v1/badges/85057564-01fa-49d4-b898-30acb74ae19e/deploy-status)](https://app.netlify.com/sites/yarnpkg/deploys)
============

This repo contains the source code for the Yarn Classic (v1) website, available at https://classic.yarnpkg.com/. For the Yarn v2 site, see https://github.com/yarnpkg/berry/tree/master/packages/gatsby

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
