### Alternatives

If you are using another OS or one of the other options specific to your OS
will not work for you, there are a couple of alternatives

##### Install via tarball

You can install Yarn by [downloading a tarball](/latest.tar.gz) and
extracting it anywhere.

```sh
cd /opt
wget https://yarnpkg.com/latest.tar.gz
tar zvxf yarn-*.tar.gz
# Yarn is now in /opt/yarn-[version]/
```

You will need to [install Node.js](https://nodejs.org/) if you don't already
have it installed.

##### Install via npm

You can also install Yarn through the [npm package manager](http://npmjs.org/)
if you already have it installed. If you already have
[Node.js](https://nodejs.org/) installed then you should already have npm. If
not, you can install Node.js (with npm) by following
[these instructions](https://nodejs.org/en/download/).

Once you have npm installed you can run:

```sh
npm install --global yarn
```
