<div class="install-only-stable" markdown="1">
#### Homebrew

You can install Yarn through the [Homebrew package manager](http://brew.sh/).
This will also install Node.js if it is not already installed.

```sh
brew install yarn
```

If you use [nvm](https://github.com/creationix/nvm) or similar, you should ensure that your `PATH` lists nvm's shims before the version of Node.js installed by Homebrew.

#### MacPorts

You can install Yarn through [MacPorts](https://www.macports.org/).
This will also install Node.js if it is not already installed.

```sh
sudo port install yarn
```

{% include_relative _installations/tarball.md %}

</div>

<div class="install-only-rc install-only-nightly" markdown="1">
Currently, there are no Homebrew or MacPorts packages available for RC or nightly builds of Yarn. Please use the tarball:
{% include_relative _installations/tarball.md %}
</div>

#### Path Setup

<!-- prettier-ignore -->
{% include_relative _installations/unix_path_setup.md %}

#### Upgrade Yarn

Yarn will warn you if a new version is available.
To upgrade Yarn, you can do so with Homebrew.

```sh
brew upgrade yarn
```
