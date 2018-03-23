### Windows

There are three options for installing Yarn on Windows.

#### Download the installer

This will give you a `.msi` file that when run will walk you through installing
Yarn on Windows.

If you use the installer you will first need to install
[Node.js](https://nodejs.org/).

<a class="btn btn-primary" href="/latest.msi">Download Installer</a>

#### Install via Chocolatey

[Chocolatey](https://chocolatey.org/) is a package manager for Windows.
You can install Chocolatey by following
[these instructions](https://chocolatey.org/install).

Once you have Chocolatey installed, you may install yarn by running the
following code in your console:

```sh
choco install yarn
```

This will also ensure that you have [Node.js](https://nodejs.org/) installed.

#### Install via Scoop

[Scoop](http://scoop.sh) is a command-line installer for Windows, you can
install Scoop by following
[these instructions](https://github.com/lukesampson/scoop/wiki/Quick-Start).

Once you have Scoop installed, you may install yarn by running the
following code in your console:

```sh
scoop install yarn
```

If [Node.js](https://nodejs.org/) is not installed, scoop will give you a suggestion to install it.
Example:

```sh
scoop install nodejs
```

#### Notice

Please whitelist your project folder and the Yarn cache directory (%LocalAppData%\Yarn) in your antivirus software, otherwise installing packages will be significantly slower as every single file will be scanned as it's written to disk.
