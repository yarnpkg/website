---
id: release_process
guide: yarn_organization
layout: guide
---

## To release a new version of Yarn <a class="toc" id="toc-to-release-a-new-version-of-yarn" href="#toc-to-release-a-new-version-of-yarn"></a>

* Make sure current master branch is green on [Circle](https://circleci.com/gh/yarnpkg/yarn) and [Travis](https://travis-ci.com/yarnpkg/yarn/builds)

Currently, building a release is a two-step process - Most stuff is built on Linux, and some Windows-specific stuff (such as the Windows installer) is built on Windows. In the future, we'll automate more of this process

**On Linux:**

1. `./scripts/release-branch.sh`
2. Build Debian and RPM packages: `./scripts/build-deb.sh`
3. Attach `.deb` and `.rpm` files from `artifacts` directory to the Github release

**On Windows:**

1. Build Yarn like normal (`yarn install && yarn run build`)
2. `powershell .\scripts\build-dist.ps1`
3. Build Windows installer: `yarn run build-win-installer`
    * TODO: Add Authenticode signing for installer ([#619](https://github.com/yarnpkg/yarn/issues/619))
4. Build Chocolately package: `yarn run build-chocolatey`
5. Attach resulting `.msi` file from `artifacts` directory to Github release
6. [Upload Chocolatey package](https://chocolatey.org/packages/upload) (in the future we should automate this).
    * Note: Only do this once the MSI is attached to the Github release, as Chocolatey pulls the MSI via the download link
    * Also note: Modifying the MSI after uploading the Chocolatey package will break the Chocolatey package, as it contains a hash of the MSI. Make sure to always update both at the same time!

**Once all artifacts are attached to release (`.tar.gz`, `.deb`, `.rpm` and `.msi`)**

1. Bump `latest_version` in [_config.yml on the website](https://github.com/yarnpkg/website/blob/master/_config.yml#L9). This updates the download URLs (`/latest.tar.gz` etc) to point to the new release.
2. To update Debian/Ubuntu and CentOS repos, run `./update.sh` in [releases repo](https://github.com/yarnpkg/releases) then push changes
    * Requires GPG keys to be installed (`6963F07F` for RPM and `9D41F3C3` for Debian). Currently Daniel holds the private keys for these, ask him for the private keys if you need them.

## To patch existing version of Yarn <a class="toc" id="toc-to-patch-existing-version-of-yarn" href="#toc-to-patch-existing-version-of-yarn"></a>

- Switch to released branch `get checkout 0.x-stable`, e.g 0.7-stable
- Cherry-pick fixes from master branch
- Tag the new release `npm version patch`, it will create a commit with changed
  package.json and tag `v0.xx.1` to that commit
- Push to origin `git push origin 0.x-stable --follow-tags`
