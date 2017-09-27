---
id: docs_cli_licenses
guide: docs_cli
layout: guide
---

<p class="lead">List licenses for installed packages.</p>

##### `yarn licenses list` <a class="toc" id="toc-yarn-licenses-ls" href="#toc-yarn-licenses-ls"></a>

Running this command will list, in alphabetical order all of the packages that
were installed by `yarn` or `yarn install`, and give you the license (and URL
to the source code) associated with each package.

```sh
yarn licenses list
```

```
yarn licenses v0.14.0
├─ abab@1.0.3
│  ├─ License: ISC
│  └─ URL: git+https://github.com/jsdom/abab.git
├─ abbrev@1.0.9
│  ├─ License: ISC
│  └─ URL: http://github.com/isaacs/abbrev-js
├─ acorn-globals@1.0.9
│  ├─ License: MIT
│  └─ URL: https://github.com/ForbesLindesay/acorn-globals.git
├─ acorn@2.7.0
│  ├─ License: MIT
│  └─ URL: https://github.com/ternjs/acorn.git
├─ align-text@0.1.4
│  ├─ License: MIT
│  └─ URL: git://github.com/jonschlinkert/align-text.git
├─ amdefine@1.0.0
│  ├─ License: BSD-3-Clause AND MIT
│  └─ URL: https://github.com/jrburke/amdefine.git
├─ ansi-escapes@1.4.0
│  ├─ License: MIT
│  └─ URL: https://github.com/sindresorhus/ansi-escapes.git
├─ ansi-regex@2.0.0
│  ├─ License: MIT
│  └─ URL: https://github.com/sindresorhus/ansi-regex.git
...
```

##### `yarn licenses generate-disclaimer` <a class="toc" id="toc-yarn-licenses-generate-disclaimer" href="#toc-yarn-licenses-generate-disclaimer"></a>

Running this command will return a sorted list of licenses from all the
packages you have installed to the `stdout`.

```sh
yarn licenses generate-disclaimer
```

```
The following software may be included in this product: package-1. This software contains the following license and notice below:

[[LICENSE TEXT]]

-----

The following software may be included in this product: package-2. This software contains the following license and notice below:

[[LICENSE TEXT]]
```
