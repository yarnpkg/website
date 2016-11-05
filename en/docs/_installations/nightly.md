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

See [the nightly build site](https://nightly.yarnpkg.com/) for more information.
