On [CircleCI](https://circleci.com/), you can install Yarn as part of your build by adding this to your `circle.yml` file:

```yml
depenencies:
  pre:
    # Install Yarn
    - sudo apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3
    - echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    - sudo apt-get update -qq
    - sudo apt-get install -y -qq yarn
  cache_directories:
    - "~/.yarn-cache"
```
