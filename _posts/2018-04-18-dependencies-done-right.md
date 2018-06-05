---
layout     : post
title      : "Dependencies Done Right"
author     : Maël Nison
author_url : "https://twitter.com/arcanis"
date       : 2018-04-18 8:00:00
categories : announcements
share_text : "Dependencies Done Right, or why peer dependencies can be the better choice"
---

Let's say we want to write a React plugin. Since we'll need to require the `react` package, we add it to our dependencies like this:

```json
{
  "name": "my-awesome-plugin",
  "dependencies": {
    "react": "^16.0.0"
  }
}
```

Then we run `yarn install`, everything works, we're happy, we publish our package to the World Wide Web, and then...

Someone tries to install it, and it breaks. Not cool.

We start getting reports from users saying that React is present multiple times in their dependency tree - once as top-level dependency of their project, and another time as a dependency of our plugin. This must be wrong! Since both of these `package.json` files list compatible versions of React, the package manager should surely merge them together into a single one, right? Turns out, it is not that simple. Let's see what happens and how we can remediate it!

_If you're just interested in the solution and not knowing why it works this way, scroll to the last paragraph! Otherwise, keep reading!_

## A Tale of Semantics

See, the fields in `package.json` all have a meaning. That's not new. But what are they exactly? What are their semantics? To borrow the C/C++ vocabulary, which behaviors are spec-defined, and which ones are [implementation defined](https://en.wikipedia.org/wiki/Unspecified_behavior#Implementation-defined_behavior) or, worse, [undefined behavior](https://en.wikipedia.org/wiki/Undefined_behavior)? To answer this question, let's explain these fields and their guarantees in plain English:

- The `dependencies` object guarantees that, for each entry, your package will be able to access the specified version of the dependency through `require()`. It also guarantees that all exported bins from those dependencies will be made available to your scripts (when running `yarn run <script name>`).

- The `devDependencies` object guarantees that, for each entry, your package will be able to access the specified version of the dependency through `require()`, provided that your package is at the top of the dependency tree, and that the installation hasn't been run in production mode (`--production`).

- The `peerDependencies` object guarantees that, for each entry, any package that requires you will be requested to provide a copy of the dependency listed here, ideally matching the version you requested. It also guarantees that you'll be able to access this dependency through `require()`, and finally **it also guarantees that the return of `require()` will be exactly the same version & instance than the one your parent would obtain if they were to `require()` it themselves**.

And that's the catch. When you specify a dependency, package managers are not required to give you the exact same version from anywhere in the dependency tree! Doing so is an optimization, and while we try to do our best to remove duplicated packages from the tree, it's not always feasible or possible. Because we cannot guarantee it, _you should not rely on us doing it_. By spec, we are allowed to change the behavior from a version to another if we think it might give a better result. We technically could even disable hoisting altogether!

> **Why is it not guaranteed?** The first reason is that hoisting the packages is not always possible. Consider the following case: both Foo and Bar depend on HelloWorld@1.0.0, and the top-level package depends on Foo, Bar, and HelloWorld@2.0.0. Because of how the Node resolution works, Foo and Bar copies of HelloWorld cannot be hoisted (they would conflict with the version required by the top-level), meaning that the result of their `require()` calls will be different instances.
>
> Another reason is that hoisting can be optimized for different things - do you want your dependency tree to use the latest possible versions - which possibly means a more stable application? Or do you want it to optimize for the size and merge all packages together as much as possible, even if it means not installing the latest patchs? In the end, your package managers usually have to follow an heuristic to make their decisions, which might sometimes lead to accepting different tradoffs from what you would originally expect.

## Making Things Right

Since we now know that using the regular `dependencies` field won't always merge our dependencies with similar ones used by others packages, what shall we use instead? The short answer is **peer dependencies**.

See, peer dependencies have this particular property to ensure the dependencies of your package listed here should be the exact same ones with the ones used by your parent package in the dependency tree. Even better, they also guarantee that you will always get the _exact_ same instance with them, even if we disable the hoisting! This is literally why they exist.

So without further ado, this is what we should have done:

```json
{
  "name": "my-awesome-plugin",
  "peerDependencies": {
    "react": "^16.0.0"
  }
}
```

Of course, there is a slight inconvenience: our users will now have to add `react` to their own dependencies if they haven't done so already. If they don't, then they'll get a warning, and we won't be able to access it.

Still, when talking about plugins, peer dependencies are always better! They give our users full control over which version of the core libraries they want to use (here, React), and guarantee that they will be shared consistently with any package that adds on them like our plugin. React won't get duplicated multiple times in the dependency tree anymore, decreasing the bundle size in the process and avoiding confusing `instanceof` checks that fail since objects are from different instances of React.

## A Simple Rule

To conclude, here's the rule on whether you should use dependencies or peer dependencies:

- Are you attaching yourself to something else, like a plugin? If yes, use a peer dependency for those.
- Is your dependency something that you could potentially replace with something you implement yourself? If yes, it's a dependency.
