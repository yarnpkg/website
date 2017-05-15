---
id: release_process
guide: yarn_organization
layout: guide
---

## To release a new version of Yarn <a class="toc" id="toc-to-release-a-new-version-of-yarn" href="#toc-to-release-a-new-version-of-yarn"></a>

1. Make sure current master branch is green on [Circle](https://circleci.com/gh/yarnpkg/yarn), [Travis](https://travis-ci.com/yarnpkg/yarn/builds) and [AppVeyor](https://ci.appveyor.com/project/kittens/yarn)
2. Ensure your local copy of Yarn is up-to-date, then run `./scripts/release-branch.sh`. This will create the `0.xx-stable` branch and assign tag `0.xx.0` to HEAD and push it all to git `origin`
3. CircleCI and Appveyor will automatically create a GitHub release if the build is passing. They will build the artifacts and attach them to the Github release. And also they will publish the new version to npm with tag `rc` (meaning that it won't be installed for users by default but will be available)
4. Verify that all artifacts are attached to release (`.tar.gz`, `.deb`, `.rpm` and `.msi`). **Do not continue** until this is checked
5. Generate new release notes with command `git-release-notes v0.yy.0..v0.xx.0 markdown > release-notes.md` using [git release notes tool](https://www.npmjs.com/package/git-release-notes) where v.0.yy.0 is the last stable tag **Suggestions for alternative tools are welcome**

<!-- [TODO: Instructions for updating Chocolatey should go here - Currrently Daniel does that manually] -->

## To patch existing version of Yarn <a class="toc" id="toc-to-patch-existing-version-of-yarn" href="#toc-to-patch-existing-version-of-yarn"></a>

- Switch to released branch `git checkout 0.x-stable`, e.g 0.7-stable
- Cherry-pick fixes from master branch
- Tag the new release `npm version patch`, it will create a commit with changed
  package.json and tag `v0.xx.1` to that commit
- Push to origin `git push origin 0.x-stable --follow-tags`

## To mark a release as stable
<!--email_off-->
1. Remove tag `rc` from the release on npm and set the version considered as stable to `latest`: 
```
npm dist-tag rm yarn rc
npm dist-tag add yarn@<version> latest
```
2. Bump `latest_version` in [_config.yml on the website](https://github.com/yarnpkg/website/blob/master/_config.yml#L9). This updates the download URLs (`/latest.tar.gz` etc) to point to the new release. This will eventually be automated ([#187](https://github.com/yarnpkg/website/issues/187))
3. Debian and CentOS repo should be automatically updated with the latest release within 5 minutes (keep an eye on [the commits](https://github.com/yarnpkg/releases/commits/gh-pages))
<!--/email_off-->

## Old Manual Process <a class="toc" id="toc-old-manual-process" href="#toc-old-manual-process"></a>

This is the old way releases were done, for reference (in case any of the automation breaks). Building a release was a two-step process - Most stuff is built on Linux, and some Windows-specific stuff (such as the Windows installer) is built on Windows.

**On Linux:**

1. `./scripts/release-branch.sh`
2. Build Debian and RPM packages: `./scripts/build-deb.sh`
3. Attach `.deb` and `.rpm` files from `artifacts` directory to the Github release

**On Windows:**

1. Build Yarn like normal (`yarn install && yarn run build`)
2. `powershell .\scripts\build-dist.ps1`
3. Build Windows installer: `yarn run build-win-installer`
    * TODO: Add Authenticode signing for installer ([#619](https://github.com/yarnpkg/yarn/issues/619))
4. Build Chocolatey package: `yarn run build-chocolatey`
5. Attach resulting `.msi` file from `artifacts` directory to Github release
6. [Upload Chocolatey package](https://chocolatey.org/packages/upload) (in the future we should automate this).
    * Note: Only do this once the MSI is attached to the Github release, as Chocolatey pulls the MSI via the download link
    * Also note: Modifying the MSI after uploading the Chocolatey package will break the Chocolatey package, as it contains a hash of the MSI. Make sure to always update both at the same time!
