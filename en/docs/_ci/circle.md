On [CircleCI](https://circleci.com/), you can install Yarn as part of your build by adding this to your `circle.yml` file:

```yml
dependencies:
  pre:
    # Install Yarn
    - sudo apt-key adv --fetch-keys https://dl.yarnpkg.com/debian/pubkey.gpg
    - echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    - sudo apt-get update -qq
    - sudo apt-get install -y -qq yarn
  cache_directories:
    - "~/.yarn-cache"
```

> Let CircleCI know if you want Yarn to be
> [installed by default](https://discuss.circleci.com/t/preinstall-yarn/7353).
