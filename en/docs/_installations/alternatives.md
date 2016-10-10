### Alternatives

If you are using another OS or one of the other options specific to your OS
will not work for you, there are a couple of alternatives. You will need to
[install Node.js](https://nodejs.org/) if you don't already have it installed.


#### Installation Script

The easiest way to install Yarn on macOS and generic Unix environments is via
our shell script. You can install Yarn by running the following code in your
terminal:

```sh
curl -o- https://yarnpkg.com/install.sh | bash
```

On common Linux distributions such as Debian, Ubuntu and CentOS, it is
recommended to install Yarn via our packages instead.

#### Manual Install via tarball

You can install Yarn by [downloading a tarball]({{site.baseurl}}/latest.tar.gz) and
extracting it anywhere.

```sh
cd /opt
wget https://yarnpkg.com/latest.tar.gz
tar zvxf yarn-*.tar.gz
# Yarn is now in /opt/yarn-[version]/
```

#### Install via npm

You can also install Yarn through the [npm package manager](http://npmjs.org/)
if you already have it installed. If you already have
[Node.js](https://nodejs.org/) installed then you should already have npm.

Once you have npm installed you can run:

```sh
npm install --global yarnpkg
```
