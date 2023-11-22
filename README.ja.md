Yarn Website
[![Netlify Status](https://api.netlify.com/api/v1/badges/85057564-01fa-49d4-b898-30acb74ae19e/deploy-status)](https://app.netlify.com/sites/yarnpkg/deploys)
============

このリポジトリには、<https://classic.yarnpkg.com/> で入手できるYarn Classic（v1）Webサイトのソースコードが含まれています。 Yarn v2サイトについては、<https://github.com/yarnpkg/berry/tree/master/packages/gatsby> を参照してください。

開始するには：

```sh
 Fork the repo using the fork button at the top right.
$ git clone git@github.com:yarnpkg/website.git yarn-website
$ cd yarn-website
```

Yarnと [Bundler](http://bundler.io/) がインストールされていることを確認する必要があります。
```sh
$ gem install bundler
```

その後：

```sh
$ make
```

または：

```sh
$ make install
$ make serve
```

Windowsでは、 `make`は使用できないため、` bundle`と `jekyll`を直接実行する必要があります。

```sh
bundle install
bundle exec jekyll serve --incremental
```

---

**Special thanks to [Netlify](https://www.netlify.com/) for powering the website.**
