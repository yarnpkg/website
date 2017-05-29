### macOS

#### Homebrew

You can install Yarn through the [Homebrew package manager](http://brew.sh/).
This will also install Node.js if it is not already installed.

```sh
brew install yarn
```

If you use [nvm](https://github.com/creationix/nvm) you should exclude installing NodeJS so that the nvm binaries are used.

```sh
brew install yarn --ignore-dependencies
```

#### MacPorts

You can install Yarn through [MacPorts](https://www.macports.org/).
This will also install Node.js if it is not already installed.

```sh
sudo port install yarn
```

#### Path Setup

{% include_relative _installations/unix_path_setup.md %}
