{% comment %}
Empty line. Do not remove.
{% endcomment %}
Because [GitLab CI](https://about.gitlab.com/product/continuous-integration/) uses docker in the background, you can specify an image with yarn pre-installed.

```yml
# .gitlab-ci.yml
image: node:9.4.0
```

If you're using a docker image that doesn't come with yarn pre-installed you can still install it after the container has loaded.

```yml
# .gitlab-ci.yml
image: does-not-have-yarn

before_script:
  # Install yarn as outlined in (https://yarnpkg.com/lang/en/docs/install/#alternatives-stable)
  - curl -o- -L https://yarnpkg.com/install.sh | bash
```

In either case, it's good practice to cache your `node_modules` and `.yarn` folders as well to speed up your builds.

```yml
# .gitlab-ci.yml
cache:
  paths:
    - node_modules/
    - .yarn
```

Here's an example `.gitlab-ci.yml` file using yarn to run a testing suite.
Just save this file to the root of your project and GitLab's CI will pick up the jobs.

```yml
# .gitlab-ci.yml
image: node:9.11.1

before_script:
  - yarn install

test:
  stage: test
  cache:
    paths:
    - node_modules/
    - .yarn
```
