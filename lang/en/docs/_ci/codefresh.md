{% comment %}
Empty line. Do not remove.
{% endcomment %}
[Codefresh pipelines](https://codefresh.io/docs/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/) use Docker images in all their steps so it is very easy to use any [Yarn version](https://hub.docker.com/_/node/) in any pipeline.

This pipeline [checks out](https://codefresh.io/docs/docs/codefresh-yaml/steps/git-clone/) the source code and then runs `yarn` with two [freestyle steps](https://codefresh.io/docs/docs/codefresh-yaml/steps/freestyle/).

`codefresh.yml`

```yml
version: '1.0'
stages:
  - prepare
  - test
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/react-sample-app'
    revision: master
    git: github
  MyUnitTests:
    title: Unit test
    stage: test
    image: node:11.0
    commands:
      - yarn install
      - yarn test
    environment:
      - CI=true
  MyReactBuild:
    title: Packaging application
    stage: build
    image: node:8.16
    commands:
      - yarn build
```

Notice that it is possible to use any version of node/yarn that exists in [Dockerhub](https://hub.docker.com/_/node/?tab=tags). In this case we use version 11 for running tests and version 8.6 for packaging the application. You can also use any private docker image that includes `yarn` and any other tools you need in your pipeline.

There is no need for any special caching directives as Codefresh automatically caches the current workdir with all its folders (such as `node_modules`).

For more details see [a complete pipeline with Yarn](https://codefresh.io/docs/docs/learn-by-example/nodejs/react/).
