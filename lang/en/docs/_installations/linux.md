### Debian/Ubuntu Linux

On Debian or Ubuntu Linux, you can install Yarn via our Debian package
repository. You will first need to configure the repository:

```sh
sudo curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg -o /usr/share/keyrings/yarn-keyring.asc
echo "deb [signed-by=/usr/share/keyrings/yarn-kerying.asc] https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

On Ubuntu 16.04 or below and Debian Stable, you will also need to configure [the NodeSource repository](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) to get a new enough version of Node.js.

Then you can simply:

```sh
sudo apt-get update && sudo apt-get install yarn
```

**Note**: Ubuntu 17.04 comes with `cmdtest` installed by default. If you're getting errors from installing `yarn`, you may want to run `sudo apt remove cmdtest` first. Refer to [this](https://github.com/yarnpkg/yarn/issues/2821) for more information.

If using `nvm` you can avoid the `node` installation by doing:

```sh
sudo apt-get install --no-install-recommends yarn
```

**Note**: Due to the use of `nodejs` instead of `node` name in some distros, `yarn` might complain about `node` not being installed, a workaround for this is to add an alias in your `.bashrc` file, like so: `alias nodejs=node`. This will point `yarn` to whatever version of `node` you decide to use.

### CentOS / Fedora / RHEL

On CentOS, Fedora and RHEL, you can install Yarn via our RPM package repository.

```sh
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
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

### openSUSE

On openSUSE, you can install Yarn via our RPM package repository.

```
sudo zypper ar -f https://dl.yarnpkg.com/rpm/ Yarn
sudo zypper in yarn
```

### Solus

On Solus, you can install Yarn via the Solus repository.

```sh
sudo eopkg install yarn
```

### Alpine

On Alpine Linux (3.6+), you can install Yarn with apk.

```sh
apk add yarn
```

### Path Setup

<!-- prettier-ignore -->
{% include_relative _installations/unix_path_setup.md %}
