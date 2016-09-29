---
id: docs_install
guide: docs_getting_started
layout: guide
---

Yarn is available in a number of different ways:

### Windows

On Windows, you can either [manually download the installer](/latest.msi), or
use [Chocolatey](https://chocolatey.org/):

```sh
choco install yarn
```

If you use the installer, you will need to
[install Node.js](https://nodejs.org/) yourself if you don't already have it
installed. If you use Chocolately, it will do this for you automatically.

### Debian/Ubuntu Linux

On Debian or Ubuntu Linux, you can install Yarn via our Debian package
repository. You will first need to configure the repository:
```sh
sudo apt-key adv --keyserver pgp.mit.edu --recv 5364CA44
echo "deb https://yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Then you can simply `sudo apt-get update && sudo apt-get install yarn`.

### Mac OS

TODO: Homebrew

### Other Operating Systems (Other Linux Distributions, etc.)

For any other operating systems, you can [download a tarball](/latest.tar.gz)
and extract it anywhere. For example:

```sh
cd /opt
wget https://yarnpkg.com/latest.tar.gz
tar zvxf yarn-*.tar.gz
# Yarn is now in /opt/yarn-[version]/
```

You will need to [install Node.js](https://nodejs.org/) if you don't already
have it installed.
