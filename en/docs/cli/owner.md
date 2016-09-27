---
id: docs_cli_owner
guide: docs_cli
layout: guide
---

<p class="lead">Controls which users can are the "owners" of packages in the npm registry.</p>

There are no roles such as admin and regular members in the npm registry. Either a user is the owner of a package, or they are not an owner. Owners have the right to:

1. Push new versions of a package
2. Add or remove other users as owners
3. Modify metadata for a package

##### `yarn owner add <user> [package]`

Adds a user to the owners list for a package. You must be an owner to run this.

##### `yarn owner rm <user> [package]`

Removes a user from the owners list for a package. You must be an owner to run this.

##### `yarn owner ls <package>`

Lists all owners for a package.
