موقع Yarn
[![Netlify حالة](https://api.netlify.com/api/v1/badges/85057564-01fa-49d4-b898-30acb74ae19e/deploy-status)](https://app.netlify.com/sites/yarnpkg/deploys)
============

This repo contains the source code for the Yarn Classic (v1) website, available at https://classic.yarnpkg.com/. For the Yarn v2 site, see https://github.com/yarnpkg/berry/tree/master/packages/gatsby

هذا المستودع (repo) يحتوي على شيفرة المصدر (source code) لموقع Yarn Classic النسخة (v1), على الرابط https://classic.yarnpkg.com/. أما موفع النسخة v2 أنظر https://github.com/yarnpkg/berry/tree/master/packages/gatsby   

[README العربية](README.ar.md)
[README اليابانية](README.ja.md)
[README الإنجليزية](README.md)

للبدء:

```sh
$ git clone git@github.com:yarnpkg/website.git yarn-website
$ cd yarn-website
```

يجب التأكد أن لديك Yarn و [Bundler](http://bundler.io/) مثبتان: 

```sh
$ gem install bundler
```

ثم يليه:

```sh
$ make
```

أو:

```sh
$ make install
$ make serve
```

على نظام الويندوز `make` ليس متوفر, لذالك عليك إدخال الأمر `bundle` و `jekyll` مباشرة:

```sh
bundle install
bundle exec jekyll serve --incremental
```

---

**شكر خاص ل [Netlify](https://www.netlify.com/) لتشغيل الموقع.**
