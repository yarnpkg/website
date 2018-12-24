---
id: docs_yarn_version_management
guide: docs_yarn_version_management
layout: guide
---

# yarn-versions-at-scale

{% include vars.html %}


Using yarn with 100s of repos and 100s of developments

Manually managing different yarn versions across projects is a pain. This fixes that.

Yeah the idea was that by keeping it separate, yarn can do more forward, drastic changes, between versions (that may even output different lockfiles). Currently managing yarn across multiple repos (if we have to upgrade them all at once) is massively interruptful.


You can use
### `yarn-path` <a class="toc" id="toc-yarn-path" href="#toc-yarn-path"></a>

```shell
yarn-path "./bin/yarn"
```

Instructs yarn to defer to another Yarn binary for execution. Useful if you want to bundle Yarn into your repository
and have everyone use the same version for consistency. This was introduced in Yarn 1.0, so all developers must have Yarn >= 1.0
installed.

Value must be a relative file path, or `false` to disable (default).

