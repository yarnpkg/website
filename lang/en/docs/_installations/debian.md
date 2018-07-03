On Debian or Ubuntu Linux, you can install Yarn via our Debian package
repository. You will first need to configure the repository:

<div class="install-only-stable" markdown="1">
```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```
</div>
<div class="install-only-rc" markdown="1">
```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ rc main" | sudo tee /etc/apt/sources.list.d/yarn.list
```
</div>
<div class="install-only-nightly" markdown="1">
```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://nightly.yarnpkg.com/debian/ nightly main" | sudo tee /etc/apt/sources.list.d/yarn.list
```
</div>

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

**Note**: Due to the use of `nodejs` instead of `node` name in some distros, `yarn` might complain about `node` not being installed. A workaround for this is to add an alias in your `.bashrc` file, like so: `alias node=nodejs`. This will point `yarn` to whatever version of `node` you decide to use.
