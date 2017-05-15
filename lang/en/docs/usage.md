---
id: docs_usage
guide: docs_getting_started
layout: guide
additional_reading_tags: ["basics", "cli"]
---

{% include vars.html %}

Now that you have Yarn [installed]({{url_base}}/docs/install), you can start
using Yarn. Here are some of the most common commands you'll need.

**Starting a new project**

```sh
yarn init
```

**Adding a dependency**
<!--email_off-->
```sh
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

**Upgrading a dependency**

```sh
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```
<!--/email_off-->
**Removing a dependency**

```sh
yarn remove [package]
```

**Installing all the dependencies of project**

```sh
yarn
```

or

```sh
yarn install
```
