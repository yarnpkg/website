If you are using another OS or one of the other options specific to your OS
will not work for you, there are a couple of alternatives. You will need to
[install Node.js](https://nodejs.org/) if you don't already have it installed.

On common Linux distributions such as Debian, Ubuntu and CentOS, it is
recommended to install Yarn via our packages instead.

<!-- prettier-ignore -->
{% include_relative _installations/tarball.md %}

#### Install via npm

<div class="install-only-stable install-only-rc" markdown="1">
  > **Note:** Installation of Yarn via npm is generally not recommended.
  > When installing Yarn with Node-based package managers, the package is not signed,
  > and the only integrity check performed is a basic SHA1 hash, which is a
  > security risk when installing system-wide apps.
  >
  > For these reasons, it is highly recommended that you install Yarn through the
  > installation method best suited to your operating system.

You can also install Yarn through the [npm package manager](http://npmjs.org/)
if you already have it installed. If you already have
[Node.js](https://nodejs.org/) installed then you should already have npm.

Once you have npm installed you can run:

  <div class="install-only-stable" markdown="1">
  
    ```sh
    npm install --global yarn
    ```
  
  </div>
  <div class="install-only-rc" markdown="1">
  
    ```sh
    npm install --global yarn@rc
    ```
  
  </div>
</div>
<div class="install-only-nightly" markdown="1">
  Nightly builds of Yarn are not available via npm.
</div>

### Path Setup

#### Unix/Linux/macOS

<!-- prettier-ignore -->
{% include_relative _installations/unix_path_setup.md %}

#### Windows

<!-- prettier-ignore -->
{% include_relative _installations/windows_path_setup.md %}
