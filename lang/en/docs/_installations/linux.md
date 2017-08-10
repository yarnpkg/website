### Debian/Ubuntu Linux

On Debian or Ubuntu Linux, you can install Yarn via our Debian package
repository. You will first need to configure the repository:

```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

On Ubuntu 14.04 and Debian Stable, you will also need to configure [the NodeSource repository](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) to get a new enough version of Node.js (Debian Testing and Ubuntu 16.04 come packaged with a sufficient version of Node.js, so this step is not required in those environments)

Then you can simply:

```sh
sudo apt-get update && sudo apt-get install yarn
```

**Note**: Ubuntu 17.04 comes with `cmdtest` installed by default. If you're getting errors from installing `yarn`, you may want to run `sudo apt remove cmdtest` first. Refer to [this](https://github.com/yarnpkg/yarn/issues/2821) for more information.

### CentOS / Fedora / RHEL

On CentOS, Fedora and RHEL, you can install Yarn via our RPM package repository.
```sh
sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
```

If you do not already have Node.js installed, you should also configure
[the NodeSource repository](https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora):
```sh
curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -
```

Then you can simply:
```sh
sudo yum install yarn
## OR ##
sudo dnf install yarn
```

### Arch Linux

On Arch Linux, Yarn can be installed through the official package manager.

```sh
pacman -S yarn
```

### Solus

On Solus, you can install yarn via the Solus repository.
```sh
sudo eopkg install yarn
```

### Alpine

On Alpine Linux (3.6+), you can install yarn with apk.
```sh
apk add yarn
```

### Path Setup

{% include_relative _installations/unix_path_setup.md %}
