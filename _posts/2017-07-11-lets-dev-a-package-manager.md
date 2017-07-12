---
layout     : post
title      : "Let's Dev: A Package Manager"
author     : Maël Nison
author_url : "https://twitter.com/arcanis"
date       : 2017-07-11 8:00:00
categories : announcements
share_text : "Let's Dev: A Package Manager"
---

Hello everyone! Today, we're gonna write a new package manager, even better than Yarn! Ok, maybe not, but at least we're gonna have some fun, learn how package managers work, and think about what could come next on Yarn.

> **The devil is in the details**
>
> This article omits small details and environment quirks, and focuses on the high-level architecture of a package manager, in an effort to stay succinct. For example, we're gonna assume that all paths are regular POSIX paths.
>
> That being said, there's much to say about these compatibility layers, and maybe talking about them could be an interesting follow up! Feel free to tweet at [@yarnpkg](https://twitter.com/yarnpkg) if you're interested to know more about them! 😃

To fully understand how things work, we're gonna go step by step, incrementally, adding or extending a single function at a time. We'll treat each of those steps as a separate chapter, and you will find an index of all chapters below this paragraph. Don't worry - they're all relatively short! Note that ES2017 features will be used all through the article - if you're unfamiliar with them, we recommend you to take a look at the great books [Explore ES6](http://exploringjs.com/es6/) and/or [Understanding ECMAScript 6](https://leanpub.com/understandinges6/read), and [Explore ES2017](http://exploringjs.com/es2016-es2017/). Good lecture!

* * *

* **[#](#chapter-1---bravely-download) Chapter 1 - Bravely Download**

    *Or: where we download package tarballs*

* **[#](#chapter-2--one-pinned-reference-to-rule-them-all) Chapter 2 - One (Pinned) Reference to Rule Them All**

    *Or: where we resolve package ranges*

* **[#](#chapter-3--dependencies-of-our-dependencies-are-our-dependencies) Chapter 3 - Dependencies of Our Dependencies Are Our Dependencies**

    *Or: where we extract dependencies from packages*

* **[#](#chapter-4--super-dependency-world) Chapter 4 - Super Dependency World**

    *Or: where we do the same thing, but recursively*

* **[#](#chapter-5--links-awakening) Chapter 5 - Links Awakening**

    *Or: where we install our dependencies on the filesystem*

* **[#](#chapter-6--lord-of-the-optimization) Chapter 6 - Lord of the Optimization**

    *Or: where we try not to install the whole world on our system*

* **[#](#conclusion---there-really-was-a-cakehttpsgithubcomyarnpkglets-dev-demo) Conclusion - There Really Was a [Cake](https://github.com/yarnpkg/lets-dev-demo)**

    *Or: where we reflect on what we've learned*

* * *

## Chapter 1 - Bravely Download

So, where should we start? First we have to think about what a package manager is. Let's forget the caches, the mirrors, the lockfiles, and all of the fancy command-line stuff, and let's focus on the very core: a package manager is a download manager. You ask it to download a package, and it happily executes. That's how we'll begin our adventure: with a very basic function that simply downloads something from the internet.

```js
import fetch from 'node-fetch';

async function fetchPackage(reference) {

    let response = await fetch(reference);

    if (!response.ok)
        throw new Error(`Couldn't fetch package "${reference}"`);

    return await response.buffer();

}
```

Nice job! We just have to give this function a URL, and we'll eventually get the referenced package back! Of course, it only works if you know the exact URL for your package, but it's a good start. Rome wasn't built in one day, and our package manager won't be built with a single function either.

Ok, what's next? Let's take a break and look at a classic package.json file to see what we could implement.

```js
{
    "dependencies": {
        "react": "^15.5.4",
        "babel-core": "6.25.0"
    }
}
```

Oh, right, version ranges! It would be nice if we were able to just pass a version number to our fetcher, and let it convert it to an URL, right? Then let's do this! To make it easier, we'll only add support for pinned references (ie. `1.0.0` will be supported, but not `^1.0.0`). Finding the right regexp could be tedious, but thankfully we can rely on the excellent [semver](https://github.com/npm/node-semver) module, which will handle the bulk of the work for us! That being said, we'll still need to make a small change to the signature of our `fetchPackage` function. Instead of using a string to describe a package, we'll now use a `{name, reference}` object, where the name is the package name and the reference is the identifier that allows us to unequivocally locate this package. Thanks to this change, we can now write:

```js
import semver from 'semver';

async function fetchPackage({name, reference}) {

    if (semver.valid(reference))
        return await fetchPackage({name, reference: `https://registry.yarnpkg.com/${name}/-/${name}-${reference}.tgz`});

    // ... same code as before

}
```

What do you think? If we detect that the reference is a semver version, then we convert it to an actual URL located on the Yarn registry. That's a nice download manager we have here, right? Ok, let's add a quick support for filesystem paths before we call it a day:

```js
import fs from 'fs-extra';

async function fetchPackage({name, reference}) {

    // In a pure JS fashion, if it looks like a path, it must be a path.
    if ([`/`, `./`, `../`].some(prefix => reference.startsWith(prefix)))
        return await fs.readFile(reference);

    // ... same code as before

}
```

Simple, right?

## Chapter 2 - One (Pinned) Reference to Rule Them All

Our `fetchPackage` function is great, but it has one shortcoming, and a big one: As we said, our function can currently only serve pinned references. Ranges such as `^1.0.0` cannot be served, because they can potentially refer to multiple different versions, each of them having their own tarballs. So, in order to serve them, we'll need to find a way to extract a unique pinned reference from those ranges. Fortunately, it's not that hard! See for yourself:

```js
import semver from 'semver';

async function getPinnedReference({name, reference}) {

    // 1.0.0 is a valid range per semver syntax, but since it's also a pinned
    // reference, we don't actually need to process it. Less work, yeay!~
    if (semver.validRange(reference) && !semver.valid(reference)) {

        let response = await fetch(`https://registry.yarnpkg.com/${name}`);
        let info = await response.json();

        let versions = Object.keys(info.versions);
        let maxSatisfying = semver.maxSatisfying(versions, reference);

        if (maxSatisfying === null)
            throw new Error(`Couldn't find a version matching "${reference}" for package "${name}"`);

        reference = maxSatisfying;

    }

    return {name, reference};

}

// getPinnedReference({name: "react", reference: "~15.3.0"})
//     → {name: "react", reference: "15.3.2"}

// getPinnedReference({name: "react", reference: "15.3.0"})
//     → {name: "react", reference: "15.3.0"}

// getPinnedReference({name: "react", reference: "/tmp/react-15.3.2.tar.gz"})
//     → {name: "react", reference: "/tmp/react-15.3.2.tar.gz"}
```

And ... that's it! If we see a semver range, we just have to query the NPM registry to retrieve the list of all available versions. One we obtain it, it's just a matter of selecting the best one thanks to the `maxSatisfying` function provided by the semver module, and we're all set.

Note that we don't need to do anything particular with semver versions, direct URLs, nor filesystem paths, since they'll always refer to a single package at any given time. So when we encounter them, we can just return them back without doing anything fancy.

Thanks to this function, we can now rest assured that our references will always be pinned references! Another day, another great victory for us.

## Chapter 3 - Dependencies of Our Dependencies Are Our Dependencies

In Chapter 1 we saw how to make a magic function that would download any package from anywhere, and return it. In Chapter 2, we saw how to convert volatile dependencies into pinned dependencies. That's a great start! But now we'll need to resolve a bigger issue: dependencies. See, the Node ecosystem being what it is, most packages rely on other packages in order to work properly. Fortunately, they all agreed on using a single standard to list those dependencies (remember the `package.json` file we've seen above), and so we should be able to make good use of this. Let's write our function. Given a package, we want it to return the dependencies this package relies on.

> **Can't escape the tooling**
>
> Even if this article tries to stay focused on the core principle of package managers, we will need some utility function from to time. When you encounter a symbol imported from `./utilities`, just don't bother understanding how it works under the hood. It's usually some boring and verbose code. That being said, all sources are available in annex, including the utilities, so if you're really interested, give it a look later!

```js
// This function reads a file stored within an archive
import {readPackageJsonFromArchive} from './utilities';

async function getPackageDependencies({name, reference}) {

    let packageBuffer = await fetchPackage({name, reference});
    let packageJson = JSON.parse(await readPackageJsonFromArchive(packageBuffer));

    // Some packages have no dependency field
    let dependencies = packageJson.dependencies || {};

    // It's much easier for us to just keep using the same {name, reference}
    // data structure across all of our code, so we convert it there.
    return Object.keys(dependencies).map(name => {
        return { name, reference: dependencies[name] };
    });

}

// getPackageDependencies({name: "react", reference: "15.6.1"})
//     → [{name: "create-react-class", reference: "^15.6.0"},
//        {name: "prop-types", reference: "^15.5.10"}]
```

What do you think? We've even been able to use our very own `fetchPackage` implementation! From now on, whatever package people send us, we'll be able to know what other packages it depends on. We'll now have to expand this ability a bit further: instead of resolving the first level of dependencies only, we'll want to resolve *everything*. And that's what the next chapter is about!

## Chapter 4 - Super Dependency World

Time we go full recursion. See, the idea is that before being able to install your packages into your `node_modules` folder, we'll first have to “install” them in memory. Why, you say? Well, proceeding this way will allow us to manipulate the tree before actually persisting it on the filesystem. Whether it's deduplication or hoisting, everything will have to be applied on this tree rather than on the actual disk (which would be really slow otherwise). But we'll cover that in another chapter! Right now, let's focus on extracting a complete dependency tree from a single root dependency. Since we've already written all the needed pieces (first the function to convert a volatile reference to a pinned reference, then the function to obtain a package dependencies), it will be quick. Let's get down to it:

```js
async function getPackageDependencyTree({name, reference, dependencies}) {

    return {name, reference, dependencies: await Promise.all(dependencies.map(async (volatileDependency) => {

        let pinnedDependency = await getPinnedReference(volatileDependency);
        let subDependencies = await getPackageDependencies(pinnedDependency);

        return await getPackageDependencyTree(Object.assign({}, pinnedDependency, {dependencies: subDependencies}));

    }))};

}
```

This one might look hard to digest, but bear with me! We start from a single package with its list of dependencies. Then, for each one of those dependencies, we first resolve the dependency's reference to become a pinned reference, then fetch its own dependencies, and then repeat the cycle on those sub-dependencies. In the end, we'll have a tree structure, where each package will be a node that contains its own dependencies!

In order to use this function, we just have to read the initial dependencies from the `package.json` file located in the local working directory - everything inside is there for us to use!

```js
import {resolve} from 'path';
import util      from 'util';

// We'll use the first command line argument (argv[2]) as working directory,
// but if there's none we'll just use the directory from which we've executed
// the script
let cwd = process.argv[2] || process.cwd();
let packageJson = require(resolve(cwd, `package.json`));

// Remember that because we use a different format for our dependencies than
// a simple dictionary, we also need to convert it when reading this file
packageJson.dependencies = Object.keys(packageJson.dependencies || {}).map(name => {
    return { name, reference: packageJson.dependencies[name] };
});

getPackageDependencyTree(packageJson).then(tree => {
    console.log(util.inspect(tree, {depth: Infinity}));
});
```

Now, let's test this code. Try running it inside a directory that contains the following `package.json`:

```json
{
    "name": "my-awesome-package",
    "dependencies": {
        "tar-stream": "*"
    }
}
```

If everything goes According To Plan, here's what you should obtain (or similar, depending on whether a package has been upgraded since the time this article has been written):

> **Undefined Reference**
>
> You might notice a weird reference on the following snippet: `undefined`. It's actually expected! This reference is used on the root package only in order to tell the linker (more on that later) that this package is a bit special. In a real-life situation, we would probably want to use a special type reference (for example `root:///path/to/package`), but here it's not necessary.

```js
{ name: "my-awesome-package",
  reference: undefined,
  dependencies:
   [ { name: 'tar-stream',
       reference: '1.5.4',
       dependencies:
        [ { name: 'bl',
            reference: '1.2.1',
            dependencies:
             [ { name: 'readable-stream',
                 reference: '2.2.11',
                 dependencies:
                  [ { name: 'core-util-is', reference: '1.0.2', dependencies: [] },
                    { name: 'inherits', reference: '2.0.3', dependencies: [] },
                    { name: 'isarray', reference: '1.0.0', dependencies: [] },
                    { name: 'process-nextick-args',
                      reference: '1.0.7',
                      dependencies: [] },
                    { name: 'safe-buffer', reference: '5.0.1', dependencies: [] },
                    { name: 'string_decoder',
                      reference: '1.0.2',
                      dependencies: [ { name: 'safe-buffer', reference: '5.0.1', dependencies: [] } ] },
                    { name: 'util-deprecate', reference: '1.0.2', dependencies: [] } ] } ] },
          { name: 'end-of-stream',
            reference: '1.4.0',
            dependencies:
             [ { name: 'once',
                 reference: '1.4.0',
                 dependencies: [ { name: 'wrappy', reference: '1.0.2', dependencies: [] } ] } ] },
          { name: 'readable-stream',
            reference: '2.2.11',
            dependencies:
             [ { name: 'core-util-is', reference: '1.0.2', dependencies: [] },
               { name: 'inherits', reference: '2.0.3', dependencies: [] },
               { name: 'isarray', reference: '1.0.0', dependencies: [] },
               { name: 'process-nextick-args',
                 reference: '1.0.7',
                 dependencies: [] },
               { name: 'safe-buffer', reference: '5.0.1', dependencies: [] },
               { name: 'string_decoder',
                 reference: '1.0.2',
                 dependencies: [ { name: 'safe-buffer', reference: '5.0.1', dependencies: [] } ] },
               { name: 'util-deprecate', reference: '1.0.2', dependencies: [] } ] },
          { name: 'xtend', reference: '4.0.1', dependencies: [] } ] } ] }
```

Perfect. Now, let's try to run it with larger packages. Let's try with babel-core! Use the following `package.json` file :

```js
{
    "dependencies": {
        "babel-core": "*"
    }
}
```

Don't worry, I'll wait.

...
Still waiting.

...
Still... wait, is this script still running? That's not good, right?

At this point we can safely assume that there's something wrong in our code - Babel is not that large, and the execution should have stopped a long time ago. In order to better understand what happened, open the [babel-core](https://yarnpkg.com/en/package/babel-core) page on Yarnpkg, and check its dependencies. You should see babel-register. Good. Now, open the [babel-register](https://yarnpkg.com/en/package/babel-runtime) page on Yarnpkg, and check its dependencies. You should see... Yup. Babel-core. Now can you guess what happened? Because of the circular dependency, we've been iterating over babel-core, then babel-register, then babel-core, then... etc. Eventually, our code will end up using too much RAM and will get killed by the OS. That's really not good.

Fortunately, the fix is fairly easy! Remember that in Node, `node_modules` directories can be nested. If a package can't be located inside the current directory `node_modules`, Node will try looking for it inside the parent directory `node_modules`, then its grandparent `node_modules`, etc, until it finds a satisfying match. Let's take advantage of that:

```js
// Look, we've added an extra optional parameter! ---------------------------------v
async function getPackageDependencyTree({name, reference, dependencies}, available = new Map()) {

    return {name, reference, dependencies: await Promise.all(dependencies.filter(volatileDependency => {

        let availableReference = available.get(volatileDependency.name);

        // If the volatile reference exactly matches the available reference (for
        // example in the case of two URLs, or two file paths), it means that it
        // is already satisfied by the package provided by its parent. In such a
        // case, we can safely ignore this dependency!
        if (volatileDependency.reference === availableReference)
            return false;

        // If the volatile dependency is a semver range, and if the package
        // provided by its parent satisfies it, we can also safely ignore the
        // dependency.
        if (semver.validRange(volatileDependency.reference)
         && semver.satisfies(availableReference, volatileDependency.reference))
            return false;

        return true;

    }).map(async (volatileDependency) => {

        let pinnedDependency = await getPinnedReference(volatileDependency);
        let subDependencies = await getPackageDependencies(pinnedDependency);

        let subAvailable = new Map(available);
        subAvailable.set(pinnedDependency.name, pinnedDependency.reference);

        return await getPackageDependencyTree(Object.assign({}, pinnedDependency, {dependencies: subDependencies}), subAvailable);

    }))};

}
```

This change adds a filtering pass to our dependencies processing: if any of them happens to be already satisfied by a package made available somewhere in the upstream dependency chain, then we can just skip it, since there isn't any point in resolving it. Otherwise, we continue as usual, except that we insert them into the registry that contains our dependency chain packages. This way, our own dependencies will be able to skip installing us later on.

If we go back to our babel-core example, it will go like this:

```
- seeing babel-core@*

  - is it available in a parent module? NO
  - resolve it to babel-core@6.25.0
  - resolve its dependencies

    - seeing babel-register@^6.24.1
    - is it available in a parent module? NO
    - resolve it to babel-register@6.24.1
    - resolve its dependencies

      - seeing babel-core@^6.24.1
      - is it available in a parent module? YES, BECAUSE 6.25.0 MATCHES ^6.24.1
      - skip resolution
```

Awesome. We now have a working algorithm to compute our full dependency tree. We're almost done, just two more mandatory steps before we reach the fun and optional parts!

## Chapter 5 - Links Awakening

In Chapter 4, we saw how to obtain a complete tree of all of our dependencies. Now, we just have to download their tarballs somewhere, and extract them on the disk. The first part being made trivial by this awesome `fetchPackage` function we've conveniently written not so long ago, our linker will only be a matter of a few lines:

```js
// This function extracts an archive somewhere on the disk
import {extractNpmArchiveTo} from './utilities';

async function linkPackages({name, reference, dependencies}, cwd) {

    let dependencyTree = await getPackageDependencyTree({name, reference, dependencies});

    // As we previously seen, the root package will be the only one containing
    // no reference. We can simply skip its linking, since by definition it already
    // contains the entirety of its own code :)
    if (reference) {
        let packageBuffer = await fetchPackage({name, reference});
        await extractNpmArchiveTo(packageBuffer, cwd);
    }

    await Promise.all(dependencies.map(async (dependency) => {
        await linkPackages(dependency, `${cwd}/node_modules/${dependency.name}`);
    }));

}
```

And that's about it. This code will traverse your tree, unpack each package inside its designated directory (check the appendices for the `extractArchiveTo` implementation if you care about it), then iterate over its children and do the same for each of them. Seems good enough, but I feel like we might be forgetting something... oh right! The binaries! See, NPM's `package.json` files offers a way for packages to expose utilities to the public (more details [here](https://docs.npmjs.com/files/package.json#bin)). We'll need to add a few extra lines to support for this use case:

```js
import fs from 'fs-extra';
import path from 'path';

async function linkPackages({name, reference, dependencies}, cwd) {

    // ... same code as before, except for the end:

    await Promise.all(dependencies.map(async ({name, reference, dependencies}) => {

        let target = `${cwd}/node_modules/${name}`;
        let binTarget = `${cwd}/node_modules/.bin`;

        await linkPackages({name, reference, dependencies}, target);

        let dependencyPackageJson = require(`${target}/package.json`);
        let bin = dependencyPackageJson.bin || {};

        if (typeof bin === `string`)
            bin = {[name]: bin};

        for (let binName of Object.keys(bin)) {

            let source = resolve(target, bin[binName]);
            let dest = `${binTarget}/${binName}`;

            await fs.mkdirp(`${cwd}/node_modules/.bin`);
            await fs.symlink(relative(binTarget, source), dest);

        }

    }));

}
```

Good. But still, I can shake this feeling that... scripts! We're missing install scripts! Packages can specify commands that should run after a package has been installed (for example, they might want to compile or transpile some code depending on your environment). We don't execute them yet, but that should be fairly easy:

```js
import cp from 'child_process';
import util from 'util';

const exec = util.promisify(cp.exec);

async function linkPackages({name, reference, dependencies}, cwd) {

    // ... same code as before except the end:

    await Promise.all(dependencies.map(async ({name, reference, dependencies}) => {

        // ... same code as before

        if (dependencyPackageJson.scripts) {
            for (let scriptName of [`preinstall`, `install`, `postinstall`]) {

                let script = dependencyPackageJson.scripts[scriptName];

                if (!script)
                    continue;

                await exec(script, {cwd: target, env: Object.assign({}, process.env, {
                    PATH: `${target}/node_modules/.bin:${process.env.PATH}`
                })});

            }
        }

    }));

}
```

> **All your environments are belong to it**
>
> Note that we've only set the PATH environment variable inside this snippet, but packages usually have access to a whole lot of extra environment variables (more details [here](https://docs.npmjs.com/misc/scripts#environment)). They are rarely used, but if you plan to write a package manager then you'll have to make sure that you actually define them one way or the other.

Now, calling our linker function will install everything we need on the filesystem! Better yet, all build scripts will be run correctly, meaning you will end up with a working node_modules! Good job! Next chapter will be about performance, now things start to get interesting.

## Chapter 6 - Lord of the Optimization

Our package manager is working! However, you may notice something ... Because we're not taking advantage of Node's resolution algorithm, and because we don't try to remove duplicates from our package tree, we might end up with a really huge node_modules folder! You might think that it's not that much of an problem, but it has proven to [cause issues in the past](https://scottaddie.com/2015/08/16/npm-vs-windows-max_path-limitation/). For example, on most Windows installations, paths have a hard limit of 260 characters. For packages that are deeply nested, this limit is often exceeded and it breaks things. Fortunately, Node's resolution algorithm help us by allowing us to move the dependencies lower in the tree, as long as there is no conflict.

So let's go! Our job in this chapter will be to decrease the number of packages that get installed on the filesystem, by any means necessary. However, we will do the best we can to keep our algorithm both simple and encapsulated, so that it can be easily understood by maintainers and contributors alike, and can be switched or disabled in a single line if we need to.

Here's a possible implementation. It's not perfect, but it's a good start! Don't be scared by its length, most of this is just comments:

```js
function optimizePackageTree({name, reference, dependencies}) {

    // This is a Divide & Conquer algorithm - we split the large problem into
    // subproblems that we solve on their own, then we combine their results
    // to find the final solution.
    //
    // In this particular case, we will say that our optimized tree is the result
    // of optimizing a single depth of already-optimized dependencies (ie we first
    // optimize each one of our dependencies independently, then we aggregate their
    // results and optimize them all a last time).
    dependencies = dependencies.map(dependency => {
        return optimizePackageTree(dependency);
    });

    // Now that our dependencies have been optimized, we can start working on
    // doing the second pass to combine their results together. We'll iterate on
    // each one of those "hard" dependencies (called as such because they are
    // strictly required by the package itself rather than one of its dependencies),
    // and check if they contain any sub-dependency that we could "adopt" as our own.
    for (let hardDependency of dependencies.slice()) {
        for (let subDependency of hardDependency.dependencies.slice()) {

            // First we look for a dependency we own that is called
            // just like the sub-dependency we're iterating on.
            let availableDependency = dependencies.find(dependency => {
                return dependency.name === subDependency.name;
            });

            // If there's none, great! It means that there won't be any collision
            // if we decide to adopt this one, so we can just go ahead.
            if (!availableDependency.length)
                dependencies.push(subDependency);

            // If we've adopted the sub-dependency, or if the already existing
            // dependency has the exact same reference than the sub-dependency,
            // then it becames useless and we can simply delete it.
            if (!availableDependency || availableDependency.name === subDependency.name) {
                hardDependency.dependencies.splice(hardDependency.dependencies.findIndex(dependency => {
                    return dependency.name === subDependency.name;
                }));
            }

        }
    }

    return { name, reference, dependencies };

}
```

And that's it. We'll just have to call this function after resolving and before linking, and we'll get a much simpler tree that will still produce a valid output according to Node's resolution algorithm!

> **The devil really was in the details**
>
> As we saw in the introduction of this article, a large amount of what makes package managers complex software lies in the details. Our optimizer code suffers from this: despite it working in many cases, it actually has an unfortunate bug related to how binaries are linked. With the code shown above, package binaries will not be installed where they should, because when optimizing we lose the information that would allow the linker to correctly link each binary to the right location. Because of this, they will not be found when running the `build` scripts. Oops!
>
> Solving this would require adding some fields into our resolution tree nodes that we would then use to track the nodes original locations in the tree. The linker would then be able to link the binaries directly inside its children in a post-processing pass. Unfortunately, it would also make the code much less clear, so we opted not to implement this here. Such is the tough life of package manager writers...

## Conclusion - There Really Was a [Cake](https://github.com/yarnpkg/lets-dev-demo)

Finally! After all this time, we finally have our tiny package manager! You can even see its full code on [this repository](https://github.com/yarnpkg/lets-dev-demo) - try it, it really works! It is admittedly pretty basic, kind of slow, and without much features, but we love it nevertheless and that's all that matters. And because it's young, there is still room for some evolution and improvements:

* We could implement a powerful CLI that would be similar to Yarn! With progress bars, and emojis, and all those fancy things! In fact, the demo already has progress bars, so that's a good start!

* We could split our functions into modules! Our package manager would then be a simple CLI, and our fetchers / resolvers / linkers would be loaded from a configuration file. Want to link everything using symlinks or hardlinks instead of copying files? Just use another linker than the default one! Want to add support for extra fetchers? Add them to your config files and be done with it! In fact, we even [started experimenting with something similar in Yarn](https://github.com/yarnpkg/yarn/pull/3501).

* We could also improve our optimizer so that it would actually work in every case! ;) And assuming a plugin architecture like the one we talked in the previous item, we could implement multiple optimization strategies — from the `[--flat](https://yarnpkg.com/lang/en/docs/cli/install/#toc-yarn-install-flat)` option to ensure that we wouldn't use multiple versions of any single package, up to the more esoteric optimizers that would use more complex strategies, such as [SAT solvers](https://github.com/yarnpkg/yarn/issues/422) — and all without any risk of hurting the core package manager experience!

* We could persist our resolution tree to a file on the disk, which we would call `yarn.lock`, and each time we would need to process a package from within our `getPinnedReference` and `getPackageDependencies` functions, we would instead extract that information from the file instead of over the network! (In case you're wondering, that's exactly how Yarn's yarn.lock works, and NPM 5's `package-lock.json`)

* We could save the tarballs in some sort of a cache, so that we wouldn't have to download them from the network multiple times.

This is only a short list, far from being exhaustive! Package managers can implement a wide range of features, which can each be improved in a lot of different ways. As you can see, the future looks bright: who can tell what new improvements will come over the next years? No one can tell for sure, but what I can tell you is to watch this blog for the next Yarn announcement!

* * *

I hope you've enjoyed this article as much as I've taken pleasure in writing it! If you want to discuss it, whether it's to correct some mistake or to just talk about package managers, ping me on Twitter via [@arcanis](https://twitter.com/arcanis), or on Yarn's [Discord](https://discord.gg/yarnpkg) server where the core team regularly lurks :)
