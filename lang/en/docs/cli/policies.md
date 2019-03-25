---
id: docs_cli_policies
guide: docs_cli
layout: guide
---

{% include vars.html %}

<p class="lead">Defines project-wide policies for your project.</p>

### Enforcing Yarn's version across your project <a class="toc" id="toc-policies-set-version" href="#toc-policies-set-version"></a>

When working inside a team, you usually end up in the situation where one of your
colleagues uses a different version of Yarn than you. While usually inconsequential,
it might sometimes cause subtle and hard to debug issues - for example your colleague
might be on a version of Yarn that doesn't support a feature you rely on, such as
the workspaces.

In order to alleviate this issue, you can specify the required Yarn version inside
the `package.json` file, which will prompt your colleagues to use the same version as
you. Unfortunately, while technically strong, this technique adds an unwanted burden
on them - given that the Yarn binary is typically global, switching from a branch to
another might be particularly annoying if they change the version.

To fix that, `yarn policies set-version` offers a simple way to **checkin your Yarn
release within your repository.** Once you run it, your configuration will be updated
in such a way that anyone running a Yarn command inside the project will always use
the version you set - and this transparently.

The command accepts various ways to set which version you want to use:

  - `yarn policies set-version` will download the latest stable release
  - `yarn policies set-version --rc` will download the latest rc release
  - `yarn policies set-version 1.13.0` will download a specific version
  - `yarn policies set-version '^1.12.0'` will download the latest minor

Under the hood, the command will simply download the single-file release from the
GitHub repository, store it inside your project (inside the `.yarn/releases` folder),
then finally update your configuration to point to the new file (using `yarn-path`).

Note that this command also is the preferred way to upgrade Yarn - it will work no
matter how you originally installed it, which might sometimes prove difficult to
figure out otherwise.
