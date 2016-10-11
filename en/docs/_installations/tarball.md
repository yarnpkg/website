#### Installation Script

The easiest way to install Yarn on macOS and generic Unix environments is via
our shell script. You can install Yarn by running the following code in your
terminal:

```sh
curl -o- -L https://yarnpkg.com/install.sh | bash
```

#### Manual Install via tarball

You can install Yarn by [downloading a tarball]({{site.baseurl}}/latest.tar.gz) and
extracting it anywhere.

```sh
cd /opt
wget https://yarnpkg.com/latest.tar.gz
tar zvxf yarn-*.tar.gz
# Yarn is now in /opt/yarn-[version]/
```
