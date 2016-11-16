On [Travis CI](https://travis-ci.org/), you can install Yarn as part of your build by adding this to your `.travis.yml` file:

```yml
before_install:
  # Repo for newer Node.js versions
  - curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  # Repo for Yarn
  - sudo apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
  - echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  - sudo apt-get update -qq
  - sudo apt-get install -y -qq yarn
cache:
  directories:
  - $HOME/.yarn-cache
```

{% include_relative _ci/deb-specific-version.md %}

> Let Travis CI know if you want Yarn to be
> [installed by default](https://github.com/travis-ci/travis-ci/issues/6720).
