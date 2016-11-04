### Nightly Builds

Nightly builds are the latest and greatest versions of Yarn, built using the very latest Yarn source code. Nightly builds are useful to try new features or test bug fixes that have not yet been released as part of a stable release. However, these builds are **not guaranteed to be stable** and may have bugs. See [the nightly build site](https://nightly.yarnpkg.com/) for more information.

The easiest way of installing a nightly build is via our shell script:
```sh
wget https://yarnpkg.com/install.sh
chmod +x install.sh
./install.sh --nightly
```

A Ubuntu/Debian repository of the nightly builds is also available. To enable it, run the following commands:
```sh
sudo apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
echo "deb http://nightly.yarnpkg.com/debian/ nightly main" | sudo tee /etc/apt/sources.list.d/yarn-nightly.list
sudo apt-get update && sudo apt-get install yarn
```

On Windows, the [Windows installer](https://nightly.yarnpkg.com/latest.msi) can be used.
