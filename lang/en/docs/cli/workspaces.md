---
id: docs_cli_workspaces
guide: docs_cli
layout: guide
---

<p class="lead">Show information about your workspaces.</p>

### What is a workspace? <a class="toc" id="toc-what-is-a-workspace" href="#toc-what-is-a-workspace"></a>

To learn more about workspaces, check these links:

* [Workspaces in Yarn]({{url_base}}/blog/2017/08/02/introducing-workspaces)
* [Workspaces]({{url_base}}/docs/workspaces)

### Commands <a class="toc" id="toc-commands" href="#toc-commands"></a>

##### `yarn workspace info <command>` <a class="toc" id="toc-yarn-workspaces-info" href="#toc-yarn-workspaces-info"></a>

This command will display the dependency tree of your current workspace.

```sh
yarn workspaces info
```

```
yarn workspaces vx.x.x
{
  "create-subscription": {
    "location": "packages/create-subscription",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "events": {
    "location": "packages/events",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "react-art": {
    "location": "packages/react-art",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "react-call-return": {
    "location": "packages/react-call-return",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "react-dom": {
    "location": "packages/react-dom",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "react-is": {
    "location": "packages/react-is",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "react-native-renderer": {
    "location": "packages/react-native-renderer",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
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
  },
  "react-scheduler": {
    "location": "packages/react-scheduler",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "react-test-renderer": {
    "location": "packages/react-test-renderer",
    "workspaceDependencies": [
      "react-is"
    ],
    "mismatchedWorkspaceDependencies": []
  },
  "react": {
    "location": "packages/react",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "shared": {
    "location": "packages/shared",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  },
  "simple-cache-provider": {
    "location": "packages/simple-cache-provider",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  }
}
```
