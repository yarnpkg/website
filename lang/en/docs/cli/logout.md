---
id: docs_cli_logout
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Clear registry username and email.</p>

##### `yarn logout` <a class="toc" id="toc-yarn-logout" href="#toc-yarn-logout"></a>

This will remove your stored username and email for the
[npm registry](https://www.npmjs.com/) as setup by
[`yarn login`]({{url_base}}/docs/cli/login). You do need to run this to de-authenticate, registry
actions are individually authenticated.
