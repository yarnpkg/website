### Alternatives

If you are using another OS or one of the other options specific to your OS
will not work for you, there are a couple of alternatives. You will need to
[install Node.js](https://nodejs.org/) if you don't already have it installed.

On common Linux distributions such as Debian, Ubuntu and CentOS, it is
recommended to install Yarn via our packages instead.

{% include_relative _installations/tarball.md %}

#### Install via npm

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

```sh
npm install --global yarn
```

### Path Setup

#### Unix/Linux/macOS

{% include_relative _installations/unix_path_setup.md %}

#### Windows

{% include_relative _installations/windows_path_setup.md %}
