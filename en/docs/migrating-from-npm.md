---
id: docs_migrating_from_npm
guide: docs_migrating_from_npm
layout: guide
---

Migrating from npm should be a fairly easy process for most users. Yarn can
consume the same `package.json` format as npm, and can install any package from
the npm registry.

If you want to try Yarn out on your existing npm project, just try running:

```sh
yarn install
```

This will very likely move a few things around in your `node_modules` and
you'll most likely get a different set of dependencies in your tree,

If you get an error, please check for an existing issue or report it to Yarn.


If you are using an `npm-shrinkwrap.json` file right now, be aware that you'll
end up with a different set of dependencies. Yarn does not support npm
shrinkwrap files as they don't have enough information in them to power Yarn's
more deterministic algorithm.









It's easy to start using Yarn if you're currently using `npm`. Yarn respects the same `package.json` format that `npm` uses, so you can just start using Yarn without convincing the other developers on the project to use Yarn.

Convenient times to start using Yarn:

* The next time you're installing dependencies, just run `yarn install` instead of `npm install`. Since Yarn uses a global cache, this can be a lot faster.
* When you're adding a new dependency, use `yarn add <package>` instead of `npm install <package> --save`. This also uses the Yarn cache so it can be faster.

When you run either of these commands, Yarn will generate a `yarn.lock` file within the root directory of your package. You don't need to read or understand this file - just check it into source control. When other people start using Yarn instead of `npm`, the `yarn.lock` file will ensure that they get precisely the same dependencies as you have.

In most cases, running this first `yarn install` or `yarn add` will just work. In some cases, the information in a `package.json` file is not explicit enough to eliminate dependencies, and the deterministic way that Yarn chooses dependencies will run into dependency conflicts. This is especially likely to happen in larger projects where sometimes `npm install` does not work and developers are frequently removing `node_modules` and rebuilding from scratch. If this happens, try using `npm` to make the versions of dependencies more explicit, before converting to Yarn.

Other developers on the project can keep using `npm`, so you don't need to get everyone on your project to convert at the same time. The developers using `yarn` will all get exactly the same configuration as each other, and the developers using `npm` may get slightly different configurations, which is the intended behavior of `npm`.

Later, if you decide that Yarn is not for you, you can just go back to using `npm` without making any particular changes. You can delete your old `yarn.lock` file if nobody on the project is using Yarn any more but it's not necessary.

The one time when migration is more complicated is when using shrinkwraps. The `npm shrinkwrap` command creates an `npm-shrinkwrap.json` file that locks some but not all of the dependency information for a project. Yarn doesn't support the shrinkwrap format, because Yarn uses its own `yarn.lock` file to lock all of the dependency information for a project. The main thing to consider here is that Yarn does not keep the shrinkwrap file up to date. If your project relies on shrinkwraps, it's probably better to convert everyone working on the project to use Yarn at the same time. The `yarn.lock` mechanism will handle dependencies deterministically, so after converting to Yarn shrinkwrap files are no longer necessary.
