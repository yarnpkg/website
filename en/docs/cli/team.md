---
id: docs_cli_team
guide: docs_cli
layout: guide
---

<p class="lead">Maintain team memberships</p>

##### `yarn team` <a class="toc" id="toc-yarn-team" href="#toc-yarn-team"></a>

yarn team is a prefix used for a number of commands create destroy, add, rm and ls

These are to manage teams in organizations, and change team memberships. yarn team does not handle permissions for packages.

Teams must always be fully qualified with the organization/scope they belong to when operating on them, separated by a colon (:). That is, if you have a developers team on a foo organization, you must always refer to that team as foo:developers in these commands.

### What is a team? <a class="toc" id="toc-what-is-a-team" href="#toc-what-is-a-team"></a>

Teams are sets of users that have access to a certain scope within the Organization.

Organizations allow you to manage and monitor access to both new and pre-existing public and private packages through the use of teams

### Commands <a class="toc" id="toc-commands" href="#toc-commands"></a>

##### `yarn team create <scope:team>` <a class="toc" id="toc-yarn-team-create" href="#toc-yarn-team-create"></a>

Create a new team.

##### `yarn team destroy <scope:team>` <a class="toc" id="toc-yarn-team-destroy" href="#toc-yarn-team-destroy"></a>

Destroys an existing team.

##### `yarn team add <scope:team> <user>` <a class="toc" id="toc-yarn-team-add" href="#toc-yarn-team-add"></a>

Add a user to an existing team.

##### `yarn team rm <scope:team> <user>` <a class="toc" id="toc-yarn-team-rm" href="#toc-yarn-team-rm"></a>

Remove a user from a team they belong to.

##### `yarn team ls <scope>|<scope:team>` <a class="toc" id="toc-yarn-team-ls" href="#toc-yarn-team-ls"></a>

If performed on an organization name, will return a list of existing teams under that organization. If performed on a team, it will instead return a list of all users belonging to that particular team.

### Details

yarn team always operates directly on the current registry, configurable from the command line using `--registry=<registry url>`.

In order to create teams and manage team membership, you _must be a team admin_ under the given organization. Listing teams and team memberships may be done by any member of the organizations.

Organization creation and management of team admins and organization members is done through the npm website, not the CLI.

To use teams to manage permissions on packages belonging to your organization, use the yarn access command to grant or revoke the appropriate permissions.
