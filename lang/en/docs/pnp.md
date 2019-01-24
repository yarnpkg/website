---
id: docs_plugnplay_overview
guide: docs_plugnplay
layout: guide
---

{% include vars.html %}

Plug'n'Play is an alternative installation strategy unveiled in September 2018. It presents interesting characteristics that make suitable for a large panel of projects, and is designed for compatibility with the current ecosystem.

The way regular installs work is simple: Yarn generates a `node_modules` directory that Node is then able to consume. In this context, Node doesn't know the first thing about what a package is: it only reasons in terms of files. "Does this file exist here? No? Let's look in the parent `node_modules` then. Does it exist here? Still no? Too bad... parent folder it is!" - and it does this until it matches something that matches one of the possibilities. That's vastly inefficient.

When you think about it, Yarn knows everything about your dependency tree - it evens installs it! So why is Node tasked from locating your packages on the disk? Why don't we simply query Yarn, and let it tell us where to look for a package X required by a package Y? That's what Plug'n'Play (abbreviated PnP) is. Instead of generating a `node_modules` directory and leaving the resolution to Node, we now generate a single `.pnp.js` file and let Yarn tell us where to find our packages. Doing this provides a lot of benefits:

- The `node_modules` directory contains a gargantuan amount of files. Generating it makes up for more than 70% of the time needed to run `yarn install` with an hot cache. Because the copy is I/O bound, it's not like package managers can really optimize it either - we can use hardlinks or copy-on-write, but even then we still need to make a bunch of syscalls that slow us down dramatically.

- Because Node has no concept of "package", it doesn't know whether a file is _meant_ to be accessed, on top of being available. It's entirely possible that a code you write work in development but break in production because you forgot to list one of your dependencies in your `package.json` - and you won't know it until it becomes a problem and make you lose a day investigating the issue.

- Even at runtime, the Node resolution needs to make a bunch of `stat` and `readdir` calls in order to figure out where should a resolution end up. It's extremely wasteful, and is part of the reason why booting a Node application takes so much time - before even starting executing it, Node has to spend its time querying the filesystem for information that Yarn could have given him already.

- Finally, the very design of the `node_modules` folder is impractical in that it doesn't allow to dedupe packages as efficiently as one would hope. Because two packages with the same name but different versions cannot coexist in the same directory, we can't guarantee a perfect hoisting. Similarly, because the `node_modules` are deeply nested in a way that depend on the project dependencies, they cannot be shared from one project to the other.

All those problems and more are solved by Plug'n'Play.
