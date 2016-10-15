
### Windows

There are two options for installing Yarn on Windows.

#### Download the installer

This will give you a `.msi` file that when run will walk you through installing
Yarn on Windows.

If you use the installer you will first need to install
[Node.js](https://nodejs.org/).

<a class="btn btn-primary" href="/latest.msi">Download Installer</a>


#### Install via Chocolatey

A Chocolatey package is coming soon!

**Note:** Yarn is currently incompatible with installation via Ubuntu on Windows awaiting a resolution to 
<a href="https://github.com/Microsoft/BashOnWindows/issues/468">468</a>

#### Path Setup

{% include_relative _installations/windows_path_setup.md %}

#### Notice

Please put the path of your project folder and global cache folder, which is `%Appdata%\local\Yarn` by default, in the whitelist of anti-virus software, including **Windows Defender**. Otherwise they would dramatically slow down your speed of installation by scanning each file while writing dependencies into your disk.
