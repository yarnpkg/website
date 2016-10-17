
### Windows

There are two options for installing Yarn on Windows.

#### Download the installer

This will give you a `.msi` file that when run will walk you through installing
Yarn on Windows.

If you use the installer you will first need to install
[Node.js](https://nodejs.org/).

<a class="btn btn-primary" href="/latest.msi">Download Installer</a>

#### Install via Chocolatey

[Chocolatey](https://chocolatey.org/) is a package manager for Windows, you can
install Chocolatey by following
[these instructions](https://chocolatey.org/install).

Once you have Chocolatey installed, you may install yarn by running the
following code in your console:

```sh
choco install yarn
```

This will also ensure that you have [Node.js](https://nodejs.org/) installed.

**Note:** Yarn is currently incompatible with installation via Ubuntu on Windows awaiting a resolution to 
<a href="https://github.com/Microsoft/BashOnWindows/issues/468">468</a>

#### Path Setup

{% include_relative _installations/windows_path_setup.md %}

#### Notice

Please whitelist your project folder and the Yarn cache directory (%LocalAppData%\Yarn) in your antivirus software, otherwise installing packages will be significantly slower as every single file will be scanned as it's written to disk.
