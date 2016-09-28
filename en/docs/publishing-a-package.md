---
id: docs_publishing_a_package
guide: docs_creating_a_package
layout: guide
---

After creating and preparing your package for publication, it is time to publish your package.

Yarn is a client to the npm backend by default, which stores packages. Thus, you will be publishing your package to npm.

## Publishing

Assuming you have logged into the npm registry via `yarn login`, you are ready to publish your package:

```
$ yarn publish
```

You will be asked a series of questions before the actual publish occurs.

1. The new version number of your package.
1. Your npm login information, including username, email address and password.

Then the actual publishing will occur.

1. A commit will be added to your *local* repo specifying the version number change
1. Your package will be compressed into a tarball.
1. Your package will be tagged with the new version number
1. The package will be uploaded to the npm registry.
1. Your npm registry token that was used to publish will be revoked from your local client.

> Remember to push the version commit that was created to the remote repo.

## Installing or Updating

Now that your package has landed in the npm registry, it can be installed by users with `npm install`. It can also be updated by you and republished using `yarn publish` again.
