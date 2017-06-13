# Yarn Website

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
