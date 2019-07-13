---
layout     : post
title      : "Recommended security update"
author     : "Maël Nison"
author_url : "https://twitter.com/arcanis"
date       : 2019-07-12 23:44:03
categories : announcements
share_text : "Recommended security update"
---

We've been made aware of a potential attack vector in the way some data are stored in the lockfile. We recommend to [upgrade](https://yarnpkg.com/en/docs/install) Yarn to the latest 1.17.3 release as soon as you get the chance. We also recommend you to edit your lockfiles to replace any reference to the `http:` protocol:

```
$ sed -i '' 's/http:/https:/g' yarn.lock
```

## What happened?

The Yarn registry is just a DNS alias to the npm registry. For a few months in 2018, the npm registry [returned http urls instead of the regular https ones](https://npm.community/t/some-packages-have-dist-tarball-as-http-and-not-https/285/40). Although the problem seems to have been corrected earlier this year, the lockfile entries generated during this period may still reference http urls and cause Yarn to send unencrypted authentication data over the network.

## What's the mitigation?

Starting from the 1.17.3, regardless of what the registries return, we'll enforce https on the three most common hostnames: `*.yarnpkg.com`, `*.npmjs.org`, and `*.npmjs.com`. Additionally, starting from the v2, we'll rethink our default policies to make using http [require an explicit acknowledgement](https://github.com/yarnpkg/berry/issues/293) of some form.

--

Thanks to [@skovorodan](https://twitter.com/skovorodan) (operating on behalf of [Exodus](https://www.exodus.io/)) for the heads-up.
