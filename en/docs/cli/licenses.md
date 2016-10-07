---
id: docs_cli_licenses
guide: docs_cli
layout: guide
---

<p class="lead">List licenses for installed packages.</p>

##### `yarn licenses ls` <a class="toc" id="toc-yarn-licenses-ls" href="#toc-yarn-licenses-ls"></a>

> ***Currently unimplemented***

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
