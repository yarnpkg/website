[Travis CI](https://travis-ci.org/) detects the use of Yarn by the presence of `yarn.lock` in the repository root.
If it is available, Travis CI will install `yarn` if necessary, and execute `yarn` as the default install command.

If your install phase requires more, it is necessary to install Yarn yourself until it is pre-installed on build images.

```yml
before_install: # if "install" is overridden
  # Repo for Yarn
  - sudo apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
  - echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  - sudo apt-get update -qq
  - sudo apt-get install -y -qq yarn
cache:
  yarn: true
```

<!-- prettier-ignore -->
{% include_relative _ci/deb-specific-version.md %}
