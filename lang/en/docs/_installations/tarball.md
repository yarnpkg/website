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
tar zvxf latest.tar.gz
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
