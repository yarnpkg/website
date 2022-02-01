---
id: docs_cli_self_update
guide: docs_cli
layout: guide
---

<p class="lead">Updates Yarn to the latest version.</p>

##### `yarn self-update` <a class="toc" id="toc-yarn-self-update" href="#toc-yarn-self-update"></a>

_**Important**: `self-update` is not available. See [policies](https://yarnpkg.com/lang/en/docs/cli/policies/#toc-policies-set-version) for enforcing versions within a project_

In order to update your version of Yarn, you can run one of the following commands:

- `npm install --global yarn` - if you've installed Yarn via npm (recommended)
- `curl --compressed -o- -L - https://yarnpkg.com/install.sh | bash` if you're on Unix
- `npm update yarn` - if you want to update Yarn via npm
- otherwise, check the docs of the installer you've used to install Yarn
