On [CircleCI](https://circleci.com/), you can install Yarn as part of your build by adding this to your `circle.yml` file:

```yml
dependencies:
  pre:
    # Install Yarn
    - sudo apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
    - echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    - sudo apt-get update -qq
    - sudo apt-get install -y -qq yarn
  cache_directories:
    - ~/.cache/yarn
  override:
    - yarn install
```

{% include_relative _ci/deb-specific-version.md %}

> Let CircleCI know if you want Yarn to be
> [installed by default](https://discuss.circleci.com/t/preinstall-yarn/7353).
