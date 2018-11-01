---
id: docs_cli_audit
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Perform a vulnerability audit against the installed packages.</p>

##### `yarn audit [--verbose] [--json]` <a class="toc" id="toc-yarn-audit" href="#toc-yarn-audit"></a>

Checks for known security issues with the installed packages. The output is a list of known issues.

You must be online to perform the audit. The audit will be skipped if the `--offline` general flag is specified.
The command will exit with a non-0 exit code if there are issues of any severity found.
For scripting purposes, `yarn audit` also supports the `--json` flag, which will output the details for the issues in JSON-lines format (one JSON object per line) instead of plain text.

<strong>If you are experiencing issues with the audit command</strong> please run with the `--verbose` flag, which will output the JSON data that yarn sends to the npm registry as well as the response data, and open an issue on GitHub that includes this data.
