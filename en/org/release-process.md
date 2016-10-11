---
id: release_process
guide: yarn_organization
layout: guide
---

## To release a new version of Yarn <a class="toc" id="toc-to-release-a-new-version-of-yarn" href="#toc-to-release-a-new-version-of-yarn"></a>

* Make sure current master branch is green on [Circle](https://circleci.com/gh/yarnpkg/yarn) and [Travis](https://travis-ci.com/yarnpkg/yarn/builds)
* make release-branch

## To patch existing version of Yarn <a class="toc" id="toc-to-patch-existing-version-of-yarn" href="#toc-to-patch-existing-version-of-yarn"></a>

- Switch to released branch `git checkout 0.x-stable`, e.g 0.7-stable
- Cherry-pick fixes from master branch
- Tag the new release `npm version patch`, it will create a commit with changed
  package.json and tag `v0.xx.1` to that commit
- Push to origin `git push origin 0.x-stable --follow-tags`
