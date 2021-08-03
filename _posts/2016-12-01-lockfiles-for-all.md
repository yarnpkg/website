---
layout     : post
title      : "Lockfiles should be committed on all projects"
author     : Chutan Debnath
author_url : "https://miningbase.cloud/profile"
date       : 2016-11-24 8:00:00
categories : announcements
share_text : "Yarn: Lockfiles should be committed on all projects @yarnpkg"
---

Yarn is a new package manager that we built to be consistent and reliable. When
installing hundreds or even thousands of third-party packages from the internet
you want to be sure that you're executing the same code across every system.

Yarn maintains consistency across machines in two key ways:

- Yarn uses a deterministic algorithm that builds up the entire dependency tree
  before placing files where they need to be.
- Important info from the install process is stored in the `yarn.lock` lockfile
  so that it can be shared between every system installing the dependencies.

This lockfile contains information about the exact versions of every single
dependency that was installed as well as checksums of the code to make sure the
code is identical.

Yarn needs this info about every dependency because packages are constantly
changing. New versions of packages are published all the time and since
`package.json` specifies version ranges you need to lock them down to a single
version.

These version ranges exist because Yarn follows
[Semantic Versioning](http://semver.org/), or "SemVer". SemVer is a versioning
system designed around "breaking" or "non-breaking" changes.

When you have a version such as `v1.2.3`, it's broken into three parts:

- **Major (1.x.x)** – _Changes that may cause user code to break_
- **Minor (x.2.x)** – _Changes that add new features (but should not break user
  code)_
- **Patch (x.x.3)** – _Changes that are fixing bugs in previous versions (but
  do not add new features and should not break user code)_

When a package publishes a new version, the author bumps major, minor, or patch
based on the changes that they have made as a way to communicate them.

Users of packages should typically welcome minor and patch versions but should
be wary of major versions as they could break your code.

Version ranges are a way of specifying which types of changes you want to
accept and which versions you want to prevent. These version ranges then
resolve down to a single version which is either the version you have installed
or the latest published version that matches your version range.

If you don't store which version you ended up installing, someone could be
installing the same set of dependencies and end up with different versions
depending on when they installed. This can lead to "Works On My Machine"
problems and should be avoided.

Also, since package authors are people and they can make mistake, it's possible
for them to publish an accidental breaking change in a minor or patch version.
If you install this breaking change when you don't intend to it could have bad
consequences like breaking your app in production.

Lockfiles _lock_ the versions for every single dependency you have installed.
This prevents "Works On My Machine" problems, and ensures that you don't
accidentally get a bad dependency.

It also works as a security precaution: If the package author is either
malicious or is attacked by someone malicious and a bad version is published,
you do not want that code to end up running without you knowing about it.

## Libraries vs Applications

There are two primary types of projects that use Yarn:

- **Libraries** – _Projects that get published as packages to the registry and
  installed by users. (e.g. React or Babel)_
- **Applications** – _Projects that only consume other packages, typically
  building some kind of product. (e.g. Your company's app)_

For applications, most developers agree that lockfiles are A Good Idea™.
But there has been some question about using them when building libraries.

When you publish a package that contains a `yarn.lock`, any user of that
library will not be affected by it. When you install dependencies in your
application or library, only your own `yarn.lock` file is respected. Lockfiles
within your dependencies will be ignored.

It is important that Yarn behaves this way for two reasons:

- You would never be able to update the versions of sub-dependencies because
  they would be locked by other `yarn.lock` files.
- Yarn would never be able to fold (de-duplicate) dependencies so that
  compatible version ranges only install a single version.

Some have wondered why libraries should use lockfiles at all if they do not and
should not affect users. Even further, some have said that using lockfiles when
developing libraries creates a _false sense of security_ since your users could
be installing different versions than you.

This seems to logically makes sense, but let's dive deeper into the problem.

## Development Dependencies

So far we've been talking about dependencies as if there were only one type of
dependency when in fact there are several different types. These are broken
down into two categories:

- **Runtime** – _Dependencies that are used by the project's code and needed
  when the code is run._
- **Development** – _Dependencies that are only needed to work directly on the
  project_

When a library is installed by a user, only the runtime dependencies are
installed. The development dependencies are only ever installed when working
directly on the project that specifies them.

Each type of dependency creates a whole tree of dependencies which are needed
for them to be used.

It turns out that most projects (libraries or applications) have far more
dependencies for development than for runtime. The tree of dependencies created
by a projects development dependencies is almost always the largest part of the
total.

You can blame this on how frustratingly complicated JavaScript development is,
but it seems to hold true across every ecosystem. You almost always need more
code to develop projects than you need to run them.

When working on a library, it is far more likely that a development dependency
breaks just because there are more of them that _could_ break.

## The Breaking Change Race

When a package accidentally publishes a breaking change it starts the clock on
who will be the first person to catch it. Whoever installs that breaking change
first will (most likely) be the first to discover it.

Let's _imagine_ we have a package called `left-pad` which takes a string and
adds a specified amount of padding in front of it. This small and seemingly
harmless package is used by a really big project, which we'll just call...
Babel.

One day, the maintainer of `left-pad` decides they are going to do something
unspeakably evil and make it pad the right side instead. They publish it as a
patch version which quickly spreads to everyone using it.

Remember, Babel is a really huge project with tens of thousands of users and
dozens of contributors. Let's try and figure out who will catch the padding
fiasco first.

- Looking at build history, Babel was installed in CI (with the `left-pad`
  dependency) exactly **103 times** in the last 30 days.
- Looking at statistics from the registry, Babel was installed (with
  `left-pad`) by users over **5.5 Million times** in the same 30 days.

To put that in a different measurement:

- Contributors install Babel on average **every 7 hours**
- Users install Babel about on average **every 0.5 seconds**

When the `left-pad` incident happened, users discovered it almost immediately.
Notifying the Babel contributors via GitHub issues, tweets, Facebook messages,
emails, phone calls, smoke signals, and by carrier pigeon.

Babel contributors couldn't possibly prevent users from being affected by every
error. In order to do so, every 0.5 seconds they would need to be able to run
CI, notice the error, find a fix, publish a new version, and get every user to
upgrade. There's just no way to make this happen.

This might seem like a bit too extreme of an example to apply broadly, but the
reasoning stays the same just with different numbers. Libraries should always
be installed more frequently by users than by contributors. If that isn't true,
it's because no one uses that library anyways– and we should not be optimizing
our workflow around code that no one uses.

## User testing

Many library developers work very hard to maintain a test suite that has 100%
code coverage. This coverage ensures that every single line of code is run at
least once during the tests.

But it still does not catch everything. If a library has even a small number of
users, it will be far better tested by the users than it will be by any test
suite the contributors can come up with.

Users just write more code, and the code they write is not always what a
library author will expect. The more popular the library the more edge cases
users will find. Users will do things that you didn't even think was possible–
it will _horrify_ you. It will make you question the goodness of humanity.

Even if a contributor happened to beat users to finding a breaking change,
there's a pretty decent chance they won't catch it anyways. Untested edge cases
are the most likely things to break.

## The contributor's burden

Now let's talk a bit about the social side of not using lockfiles in libraries.

As mentioned previously, the majority of breaking changes that occur in library
dependencies will be development dependencies.

Some percentage of these breaking changes will be caught and (hopefully) fixed
by regular contributors. However, the remaining breaking changes will be caught
by new or infrequent contributors.

Contributing to a project for the first time is a very intimidating experience
for anyone who is not an open source veteran. If the first thing a potential
new contributor runs into is a broken build or test suite, they could be so
intimidated that they decide to forget about contributing back.

Even as someone who contributes to lots of open source projects, it's a
terrible thing to have to debug a build system for a few hours when you just
want to fix a bug or add a small feature to a library.

## The user's burden

Of course not every breaking change is a development dependency, and
theoretically contributors _could_ catch breaking changes before users notice
them. In that (narrow) scenario, aren't we shifting the burden from
contributors to users?

First, it's not going to be every user that is affected by this. It's well
agreed upon that applications should be using lockfiles, and if they are then
they won't be affected by sudden breaking changes.

We're only talking about users that are either installing a package for the
first time, or are upgrading the versions of their dependencies.

For users upgrading their dependencies, they should be trained to look out for
breaking changes and if they encounter one, to roll back the version to a
working state and open an issue in the library.

The only really negative experience that we are adding is for new users, which
is admittedly terrible. You want new users to have the best possible
experience.

But remember that they already face this burden in the majority of cases. It's
only when contributors could have caught breaking changes before users
experienced them that we are now placing an additional burden on new users.

It's also important to note that new users make up a minority of the total
installations. The majority of the time it will be existing users that are the
first to catch breaking changes because they are the ones installing a library
the most.

## In Closing

There is a simple universal rule that everyone should follow with Yarn: If you
are installing a new dependency or upgrading an existing one you should check
to make sure the package works as intended and is not breaking your code.

You should follow that rule regardless of what your libraries are doing.

Without lockfiles it gets even more complicated: In applications or libraries,
if there is no lockfile, you will have to check the dependencies every time you
install or re-install them and make sure that everything still works. Otherwise
the build might be broken or the tests might fail. You could break something
without even realizing it. You could run into situations where code works on
your machine but no one else's.

The idea that not using lockfiles in libraries somehow saves users from
encountering breaking changes is at best extremely rare and at worst is never
true.

By not using lockfiles in libraries, the only tangible thing you accomplish is
making the project harder to contribute to.

We should work as a community to keep all of our libraries up to date. We
should go out and build tooling for automatically upgrading dependencies that
makes it painless to do. There has been attempts at such tooling before, but we
can do better.

Please commit your `yarn.lock` files.
