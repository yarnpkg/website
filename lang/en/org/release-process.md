---
id: release_process
guide: yarn_organization
layout: guide
---

## Pushing a new release <a class="toc" id="toc-pushing-a-new-release" href="#toc-pushing-a-new-release"></a>

The steps vary slightly depending on the type of release you are pushing (major, minor or patch)

### To release a new patch version (eg. from 0.28.1 to 0.28.2) <a class="toc" id="toc-to-release-a-new-patch-version-eg-from-0-28-1-to-0-28-2" href="#toc-to-release-a-new-patch-version-eg-from-0-28-1-to-0-28-2"></a>

1. Cherry-pick all required changes to the `-stable` branch (eg. `0.28-stable` for 0.28).
2. Ensure you are on the `-stable` branch locally.
3. Run `npm version patch` to bump the version number, and create the Git commit and tag
4. Run `git push origin 0.xx-stable --follow-tags` (replace `0.xx-stable` with the right branch name)

### To release a new minor or major version (eg. from 0.28.x to 0.29.0) <a class="toc" id="toc-to-release-a-new-minor-or-major-version-eg-from-0-28-x-to-0-29-0" href="#toc-to-release-a-new-minor-or-major-version-eg-from-0-28-x-to-0-29-0"></a>

1. Make sure current master branch is green on [Circle](https://circleci.com/gh/yarnpkg/yarn), [Travis](https://travis-ci.com/yarnpkg/yarn/builds) and [AppVeyor](https://ci.appveyor.com/project/kittens/yarn)
2. Ensure you are on `master` and your local copy of Yarn is up-to-date
3. Run `./scripts/release-branch.sh`. This will:
   * Create the `0.xx-stable` branch and `0.xx.0` tag
   * Bump `master` to the next minor version (eg. after releasing `0.29.0`, master will be bumped to `0.30.0`)
   * Push it all to `origin`

### To mark an RC release as stable <a class="toc" id="toc-to-mark-an-rc-release-as-stable" href="#toc-to-mark-an-rc-release-as-stable"></a>

Once an RC has been tested by the community for a while and all major bugs have been ironed out, it can be marked as stable. To do this, go to [https://release.yarnpkg.com/](https://release.yarnpkg.com/) and click the "Promote RC to stable" button.

Note: There is a whitelist for the users that are able to access this page. If a maintainer is missing from the whitelist, you can [modify it here](https://github.com/yarnpkg/release-infra/blob/master/lib/config.php#L26).

## Debugging a release <a class="toc" id="toc-debugging-a-release" href="#toc-debugging-a-release"></a>

Sometimes things go wrong. Here's how to debug some common issues:

#### I've committed the tag but the site still points to the old version <a class="toc" id="toc-i-ve-committed-the-tag-but-the-site-still-points-to-the-old-version" href="#toc-i-ve-committed-the-tag-but-the-site-still-points-to-the-old-version"></a>

Check the GitHub release for any missing artifacts. The release scripts do not bump the version number on the site until both the Linux **and** the Windows artifacts have been attached to the release.

#### Linux artifacts (`.tar.gz`, `.deb`, etc.) are missing <a class="toc" id="toc-linux-artifacts-tar-gz-deb-etc-are-missing" href="#toc-linux-artifacts-tar-gz-deb-etc-are-missing"></a>

Check the [CircleCI build](https://circleci.com/gh/yarnpkg/yarn) and re-run it if it has failed. If the build succeeded, [check the webhook logs](http://release.yarnpkg.com/log/release_circleci) for any errors.

#### Windows artifacts (`.msi`) are missing <a class="toc" id="toc-windows-artifacts-msi-are-missing" href="#toc-windows-artifacts-msi-are-missing"></a>

Check the [AppVeyor build](https://ci.appveyor.com/project/kittens/yarn) and re-run it if it has failed. If the build succeeded, [check the webhook logs](http://release.yarnpkg.com/log/release_appveyor) for any errors.

#### All artifacts are attached to release, but site still points to old version <a class="toc" id="toc-all-artifacts-are-attached-to-release-but-site-still-points-to-old-version" href="#toc-all-artifacts-are-attached-to-release-but-site-still-points-to-old-version"></a>

Check the [yarn-version Jenkins build job](https://build.dan.cx/job/yarn-version/) and see whether it has failed.

---

## How to do it manually <a class="toc" id="toc-how-to-do-it-manually" href="#toc-how-to-do-it-manually"></a>

Most of the release has been automated and is fairly straightforward. Normally, you can just stop reading here. However, if the release tooling ever breaks (or if you like doing things the hard way), you can manually perform the release steps.

### Creating a new release <a class="toc" id="toc-creating-a-new-release" href="#toc-creating-a-new-release"></a>

1. Run `yarn build-dist && yarn build-deb` to build the release tarball, Debian package, and RPM package
2. Run `yarn build-dist && yarn build-win-installer` on Windows to build the Windows installer
3. GPG sign the `.tar.gz` and `.js` artifacts:
   ```sh
   gpg -u 9D41F3C3 --armor --detach-sign yarn-0.xx.xx.tar.gz
   ```
   This will generate `.asc` files that you should also attach to the release
4. Authenticode sign the `.msi` artifacts:
   ```sh
   osslsigncode sign -t http://timestamp.digicert.com -n "Yarn Installer" -i https://yarnpkg.com/ -pkcs12 yarn-20161122.pfx -readpass yarn-20161122.key -h sha1 -in yarn-0.xx.xx-unsigned.msi -out yarn-0.xx.xx.msi
   osslsigncode sign -t http://timestamp.digicert.com -n "Yarn Installer" -i https://yarnpkg.com/ -pkcs12 yarn-20161122.pfx -readpass yarn-20161122.key -nest -h sha2 -in yarn-0.xx.xx.msi -out yarn-0.xx.xx.msi
   ```
5. Create new release on GitHub, and attach all artifacts. For the MSI, ensure you attach the **signed** version!
6. Publish the tarball to npm: `npm publish ./artifacts/yarn-v0.xx.xx.tar.gz`
7. Perform post-release steps below

### Bumping RC to stable <a class="toc" id="toc-bumping-rc-to-stable" href="#toc-bumping-rc-to-stable"></a>

1. Modify GitHub release to mark it as stable
2. Run `npm dist-tag add yarn@0.xx.xx latest` (where `0.xx.xx` is the version number being released)
3. Run post-release steps below

### Post-release <a class="toc" id="toc-post-release" href="#toc-post-release"></a>

1. Bump version number in [\_config.yml on the website](https://github.com/yarnpkg/website/blob/master/_config.yml#L9)
2. Run `./scripts/build-chocolatey.ps1` to push to Chocolatey
3. Run `./scripts/update-homebrew.sh` to push to Homebrew
4. Debian and CentOS repo should be automatically updated with the latest release within 5 minutes (keep an eye on [the commits](https://github.com/yarnpkg/releases/commits/gh-pages))
