---
id: docs_configuration_package_json
guide: docs_configuration
layout: guide
---

## Essentials <a class="toc" id="toc-essentials" href="#toc-essentials"></a>

The two most important fields in your `package.json` are `name` and `version`,
without them your package won't be able to install. The `name` and `version`
fields are used together to create a unique id.

### `name` <a class="toc" id="toc-name" href="#toc-name"></a>

```json
{
  "name": "my-awesome-package"
}
```

This is the name of your package. It gets used in URLs, as an argument on the
command line, and as the directory name inside `node_modules`.

```sh
yarn add [name]
```

```
node_modules/[name]
```

```
https://registry.npmjs.org/[name]/-/[name]-[version].tgz
```

**Rules**

- Must be less than or equal to 214 characters (including the `@scope/` for
  scoped packages).
- Must not start with a dot (`.`) or an underscore (`_`).
- Must not have an uppercase letter in the name.
- Must use only URL-safe characters.

**Tips**

- Don't use the same name as a core Node.js module
- Don't put `js` or `node` in the name.
- Keep names short and descriptive. You want people to understand what it is
  from the name, but it will also be used in `require()` calls.
- Make sure that there isn't something in the
  [registry](https://www.npmjs.com/) with the same name.

### `version` <a class="toc" id="toc-version" href="#toc-version"></a>

```json
{
  "version": "1.0.0"
}
```

<!-- [TODO: Add details about package.json#version] -->

## Info <a class="toc" id="toc-info" href="#toc-info"></a>

### `description` <a class="toc" id="toc-description" href="#toc-description"></a>

```json
{
  "description": "My short description of my awesome package"
}
```

<!-- [TODO: Add details about package.json#description] -->

### `keywords` <a class="toc" id="toc-keywords" href="#toc-keywords"></a>

```json
{
  "keywords": ["short", "relevant", "keywords", "for", "searching"]
}
```

<!-- [TODO: Add details about package.json#keywords] -->

### `license` <a class="toc" id="toc-license" href="#toc-license"></a>

```json
{
  "license": "MIT",
  "license": "(MIT or GPL-3.0)",
  "license": "SEE LICENSE IN LICENSE_FILENAME.txt",
  "license": "UNLICENSED"
}
```

All packages should specify a license so that users know how they are permitted
to use it and any restrictions that you are placing on it.

You are encouraged to use an Open Source
([OSI-approved](https://opensource.org/licenses/alphabetical)) license unless
you have a specific reason not to. If you built your package as part of your
job it's likely best to check with your company before deciding on a license.

**Must be one of the following:**

- A valid [SPDX license identifier](https://spdx.org/licenses/) if you are
  using a standard license.
- A valid
  [SPDX license expression syntax 2.0 expression](https://www.npmjs.com/package/spdx)
  if you are using multiple standard licenses.
- A `SEE LICENSE IN <filename>` string that points to a `<filename>` in the top
  level of your package if you are using a non-standard license.
- A `UNLICENSED` string if you do not want to grant others the right to use a
  private or unpublished package under any terms.

## Links <a class="toc" id="toc-links" href="#toc-links"></a>

<!-- [TODO: Add details about Links in package.json] -->

### `homepage` <a class="toc" id="toc-homepage" href="#toc-homepage"></a>

```json
{
  "homepage": "https://gitlub.com/user/repo"
}
```

<!-- [TODO: Add details about package.json#homepage] -->

### `bugs` <a class="toc" id="toc-bugs" href="#toc-bugs"></a>

```json
{
  "bugs": "https://gitlub.com/user/repo/issues"
}
```

<!-- [TODO: Add details about package.json#bugs] -->

### `repository` <a class="toc" id="toc-repository" href="#toc-repository"></a>

```json
{
  "repository": { "type": "git", "url": "https://gitlub.com/user/repo.git" },
  "repository": "github:user/repo",
  "repository": "gitlab:user/repo",
  "repository": "bitbucket:user/repo",
  "repository": "gist:a1b2c3d4e5f"
}
```

<!-- [TODO: Add details about package.json#repository] -->

## Maintainers <a class="toc" id="toc-maintainers" href="#toc-maintainers"></a>

<!-- [TODO: Add details about Maintainers in package.json] -->

### `author` <a class="toc" id="toc-author" href="#toc-author"></a>

```json
{
  "author": { "name": "Your Name", "email": "you@example.com", "url": "http://your-website.com" },
  "author": "Your Name <you@example.com> (http://your-website.com)"
}
```

<!-- [TODO: Add details about package.json#author] -->

### `contributors` <a class="toc" id="toc-contributors" href="#toc-contributors"></a>

```json
{
  "contributors": [
    { "name": "Your Friend", "email": "friend@example.com", "url": "http://friends-website.com" }
    { "name": "Other Friend", "email": "other@example.com", "url": "http://other-website.com" }
  ],
  "contributors": [
    "Your Friend <friend@example.com> (http://friends-website.com)",
    "Other Friend <other@example.com> (http://other-website.com)"
  ]
}
```

<!-- [TODO: Add details about package.json#contributors] -->

## Files <a class="toc" id="toc-files" href="#toc-files"></a>

<!-- [TODO: Add details about Files in package.json] -->

### `files` <a class="toc" id="toc-files" href="#toc-files"></a>

```json
{
  "files": [
    "filename.js",
    "directory/",
    "glob/*.{js,json}"
  ]
}
```

<!-- [TODO: Add details about package.json#files] -->

### `main` <a class="toc" id="toc-main" href="#toc-main"></a>

```json
{
  "main": "filename.js"
}
```

<!-- [TODO: Add details about package.json#main] -->

### `bin` <a class="toc" id="toc-bin" href="#toc-bin"></a>

```json
{
  "bin": "bin.js",
  "bin": {
    "command-name": "bin/command-name.js",
    "other-command": "bin/other-command"
  }
}
```

<!-- [TODO: Add details about package.json#bin] -->

### `man` <a class="toc" id="toc-man" href="#toc-man"></a>

```json
{
  "man": "./man/doc.1",
  "man": ["./man/doc.1", "./man/doc.2"]
}
```

<!-- [TODO: Add details about package.json#man] -->

### `directories` <a class="toc" id="toc-directories" href="#toc-directories"></a>

```json
{
  "directories": {
    "lib": "path/to/lib/",
    "bin": "path/to/bin/",
    "man": "path/to/man/",
    "doc": "path/to/doc/",
    "example": "path/to/example/"
  }
}
```

<!-- [TODO: Add details about package.json#directories] -->

## Tasks <a class="toc" id="toc-tasks" href="#toc-tasks"></a>

<!-- [TODO: Add details about Tasks in package.json] -->

### `scripts` <a class="toc" id="toc-scripts" href="#toc-scripts"></a>

```json
{
  "scripts": {
    "do-something": "node doSomething.js"
  }
}
```

<!-- [TODO: Add details about package.json#scripts] -->

### `config` <a class="toc" id="toc-config" href="#toc-config"></a>

```json
{
  "config": {
    "port": "8080"
  }
}
```

<!-- [TODO: Add details about package.json#config] -->

## Dependencies <a class="toc" id="toc-dependencies" href="#toc-dependencies"></a>

<!-- [TODO: Add details about Dependencies in package.json] -->

### `dependencies` <a class="toc" id="toc-dependencies" href="#toc-dependencies"></a>

```json
{
  "dependencies": {
    "package-1": "^3.1.4"
  }
}
```

<!-- [TODO: Add details about package.json#dependencies] -->

### `devDependencies` <a class="toc" id="toc-devdependencies" href="#toc-devdependencies"></a>

```json
{
  "devDependencies": {
    "package-2": "^0.4.2"
  }
}
```

<!-- [TODO: Add details about package.json#devDependencies] -->

### `peerDependencies` <a class="toc" id="toc-peerdependencies" href="#toc-peerdependencies"></a>

```json
{
  "peerDependencies": {
    "package-3": "^2.7.18"
  }
}
```

<!-- [TODO: Add details about package.json#peerDependencies] -->

### `optionalDependencies` <a class="toc" id="toc-optionaldependencies" href="#toc-optionaldependencies"></a>

```json
{
  "optionalDependencies": {
    "package-5": "^1.6.1"
  }
}
```

<!-- [TODO: Add details about package.json#optionalDependencies] -->

### `bundledDependencies` <a class="toc" id="toc-bundleddependencies" href="#toc-bundleddependencies"></a>

```json
{
  "bundledDependencies": [
    "package-4"
  ]
}
```

<!-- [TODO: Add details about package.json#bundledDependencies] -->

## System <a class="toc" id="toc-system" href="#toc-system"></a>

<!-- [TODO: Add details about System info package.json] -->

### `engines` <a class="toc" id="toc-engines" href="#toc-engines"></a>

```json
{
  "engines": {
    "node": ">=4.4.7 <7.0.0",
    "zlib": "^1.2.8",
    "yarn": "^0.14.0"
  }
}
```

Checks against `process.versions` as well as the current version of yarn.

<!-- [TODO: Add details about package.json#engines] -->

### `os` <a class="toc" id="toc-os" href="#toc-os"></a>

```json
{
  "os": ["darwin", "linux"],
  "os": ["!win32"]
}
```

Checks against `process.platform`

<!-- [TODO: Add details about package.json#os] -->

### `cpu` <a class="toc" id="toc-cpu" href="#toc-cpu"></a>

```json
{
  "cpu": ["x64", "ia32"],
  "cpu": ["!arm", "!mips"]
}
```

Checks against `process.arch`

<!-- [TODO: Add details about package.json#cpu] -->

## Publishing <a class="toc" id="toc-publishing" href="#toc-publishing"></a>

### `private` <a class="toc" id="toc-private" href="#toc-private"></a>

```json
{
  "private": true
}
```

<!-- [TODO: Add details about package.json#private] -->

### `publishConfig` <a class="toc" id="toc-publishconfig" href="#toc-publishconfig"></a>

```json
{
  "publishConfig": {
    ...
  }
}
```

<!-- [TODO: Add details about package.json#publishConfig] -->
