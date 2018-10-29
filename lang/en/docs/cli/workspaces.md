---
id: docs_cli_workspaces
guide: docs_cli
layout: guide
---

<p class="lead">Show information about your workspaces.</p>

### What is a workspace? <a class="toc" id="toc-what-is-a-workspace" href="#toc-what-is-a-workspace"></a>

To learn more about workspaces, check these links:

- [Workspaces in Yarn]({{url_base}}/blog/2017/08/02/introducing-workspaces)
- [Workspaces]({{url_base}}/docs/workspaces)

### Commands <a class="toc" id="toc-commands" href="#toc-commands"></a>

##### `yarn workspaces info` <a class="toc" id="toc-yarn-workspaces-info" href="#toc-yarn-workspaces-info"></a>

This command will display the workspace dependency tree of your current project.

```sh
yarn workspaces info
```

```
yarn workspaces vx.x.x
{ "create-subscription": {
    "location": "packages/create-subscription",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  ...
  "react-noop-renderer": {
    "location": "packages/react-noop-renderer",
    "workspaceDependencies": [
      "react-reconciler"
    ],
    "mismatchedWorkspaceDependencies": []
  },
  "react-reconciler": {
    "location": "packages/react-reconciler",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  }, ... }
```

##### `yarn workspaces run <command>` <a class="toc" id="toc-yarn-workspaces-run" href="#toc-yarn-workspaces-run"></a>

This will run the chosen Yarn command in each workspace.

```sh
yarn workspaces run test
```

This will invoke the test script for each workspace.

This will also pass forward flags and can be useful for CI processes.

```sh
yarn workspaces run test --ci
```
