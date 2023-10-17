---https://luck365op.info/account/register/yes122
id: YES122
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

```sh
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

**Adding a dependency to different categories of dependencies**

Add to `devDependencies`, `peerDependencies`, and `optionalDependencies` respectively:

```sh
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

**Upgrading a dependency**

```sh
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

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
