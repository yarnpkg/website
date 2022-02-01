#### Installation Script

One of the easiest ways to install Yarn on macOS and generic Unix environments
is via our shell script. You can install Yarn by running the following code in
your terminal:

<div class="install-only-stable" markdown="1">
```sh
curl -o- -L https://yarnpkg.com/install.sh | bash
```
</div>
<div class="install-only-rc" markdown="1">
```sh
curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --rc
```
</div>
<div class="install-only-nightly" markdown="1">
```sh
curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --nightly
```
</div>

The installation process includes verifying a GPG signature.
[View the source on GitHub](https://github.com/yarnpkg/website/blob/master/install.sh)

<div class="install-only-stable" markdown="1">
You can also specify a version by running the following code in your terminal:

```sh
curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version [version]
```

See [the releases](https://github.com/yarnpkg/yarn/releases) for possible versions.

</div>

<div class="install-only-stable" markdown="1">
If you are using Node Version Manager and want per-node-version yarn installations, add the --use-nvm-at-node-version flag, followed by the target node version you've previously installed via nvm. This flag causes the install script to install yarn into the global install directory for the indicated node version, rather than your user home directory, add the binary symlinks, and also set the yarn prefix: 
For example, passing $(nvm current) as the last arg will install yarn within the current version of node set by nvm.

```sh
curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version [version] --use-nvm-at-node-version $(nvm current)
```
The script uses the NVM_DIR environment variable to ensure nvm.sh is loaded in the script environment. Be sure NVM_DIR is exported to be seen by the install script.

</div>


#### Manual Install via tarball

You can install Yarn by [downloading a tarball]({{site.baseurl}}/latest.tar.gz) and
extracting it anywhere.

<div class="install-only-stable" markdown="1">
```sh
cd /opt
wget https://yarnpkg.com/latest.tar.gz
tar zvxf latest.tar.gz
# Yarn is now in /opt/yarn-[version]/
```
</div>
<div class="install-only-rc" markdown="1">
```sh
cd /opt
wget https://yarnpkg.com/latest-rc.tar.gz
tar zvxf latest-rc.tar.gz
# Yarn is now in /opt/yarn-[version]/
```
</div>
<div class="install-only-nightly" markdown="1">
```sh
cd /opt
wget https://nightly.yarnpkg.com/latest.tar.gz
tar zvxf latest.tar.gz
# Yarn is now in /opt/yarn-[version]/
```
</div>

Before extracting Yarn, it is recommended that you verify the tarball using GPG:

```sh
wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --import
wget https://yarnpkg.com/latest.tar.gz.asc
gpg --verify latest.tar.gz.asc
# Look for "Good signature from 'Yarn Packaging'" in the output
```
