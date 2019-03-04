[Semaphore](https://semaphoreci.com/) has Yarn pre-installed for all
supported Node.js versions, and no user interaction is required for the Yarn
cache to work.

To assure that your local Yarn version matches the one on Semaphore, add the
lines below to your setup commands, in Project Settings.

```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
# install-package is a tool for caching APT installations in Semaphore
# defining a package version is optional
install-package --update-new yarn=<version>
```
