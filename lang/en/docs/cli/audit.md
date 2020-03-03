---
id: docs_cli_audit
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Perform a vulnerability audit against the installed packages.</p>

##### `yarn audit [--verbose] [--json] [--level] [--groups]` <a class="toc" id="toc-yarn-audit" href="#toc-yarn-audit"></a>

Checks for known security issues with the installed packages. The output is a list of known issues.

You must be online to perform the audit. The audit will be skipped if the `--offline` general flag is specified.

The command will exit with a non-0 exit code if there are issues of any severity found. The exit code will be a mask of the severities.

- 1 for INFO
- 2 for LOW
- 4 for MODERATE
- 8 for HIGH
- 16 for CRITICAL

For example, if only INFO and MODERATE vulnerabilities were found, then the exit code will be `1 + 4 = 5`

For scripting purposes, `yarn audit` also supports the `--json` flag, which will output the details for the issues in JSON-lines format (one JSON object per line) instead of plain text.

<strong>If you are experiencing issues with the audit command</strong> please run with the `--verbose` flag, which will output the JSON data that yarn sends to the npm registry as well as the response data, and open an issue on GitHub that includes this data.

### Commands <a class="toc" id="toc-commands" href="#toc-commands"></a>

##### `yarn audit [--level info|low|moderate|high|critical]` <a class="toc" id="toc-yarn-add" href="#toc-yarn-add"></a>

Applying the level flag will limit the audit table to vulnerabilities of the corresponding level and above. It will *not* affect the exit code of the command.


##### `yarn audit [--groups group_name ...]` <a class="toc" id="toc-yarn-add" href="#toc-yarn-add"></a>

Applying the groups flag will limit the audit table to vulnerabilities of the corresponding dependency groups (e.g dependencies,devDependencies).
