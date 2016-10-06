---
id: docs_configuration_package_json
guide: docs_configuration
layout: guide
---

## Essentials

The two most important fields in your `package.json` are `name` and `version`,
without them your package won't be able to install. The `name` and `version`
fields are used together to create a unique id.

### `name`

```json
{
  "name": "my-awesome-package"
}
```

This is the name of your package. It gets used in URLs, as an argument on the
command line, and as the directory name inside `node_modules`.

```sh
yarn install [name]
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

### `version`

```json
{
  "version": "1.0.0"
}
```

## Info

### `description`

```json
{
  "description": "My short description of my awesome package"
}
```

### `keywords`

```json
{
  "keywords": ["short", "relevant", "keywords", "for", "searching"]
}
```

### `license`

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

## Links

### `homepage`

```json
{
  "homepage": "https://gitlub.com/user/repo"
}
```

### `bugs`

```json
{
  "bugs": "https://gitlub.com/user/repo/issues"
}
```

### `repository`

```json
{
  "repository": { "type": "git", "url": "https://gitlub.com/user/repo.git" },
  "repository": "github:user/repo",
  "repository": "gitlab:user/repo",
  "repository": "bitbucket:user/repo",
  "repository": "gist:a1b2c3d4e5f"
}
```

## Maintainers

### `author`

```json
{
  "author": { "name": "Your Name", "email": "you@example.com", "url": "http://your-website.com" },
  "author": "Your Name <you@example.com> (http://your-website.com)"
}
```

### `contributors`

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

## Files

### `files`

```json
{
  "files": [
    "filename.js",
    "directory/",
    "glob/*.{js,json}"
  ]
}
```

### `main`

```json
{
  "main": "filename.js"
}
```

### `bin`

```json
{
  "bin": "bin.js",
  "bin": {
    "command-name": "bin/command-name.js",
    "other-command": "bin/other-command"
  }
}
```

### `man`

```json
{
  "man": "./man/doc.1",
  "man": ["./man/doc.1", "./man/doc.2"]
}
```

### `directories`

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

## Tasks

### `scripts`

```json
{
  "scripts": {
    "do-something": "node doSomething.js"
  }
}
```

### `config`

```json
{
  "config": {
    "port": "8080"
  }
}
```

## Dependencies

### `dependencies`

```json
{
  "dependencies": {
    "package-1": "^3.1.4"
  }
}
```

### `devDependencies`

```json
{
  "devDependencies": {
    "package-2": "^0.4.2"
  }
}
```

### `peerDependencies`

```json
{
  "peerDependencies": {
    "package-3": "^2.7.18"
  }
}
```

### `optionalDependencies`

```json
{
  "optionalDependencies": {
    "package-5": "^1.6.1"
  }
}
```

### `bundledDependencies`

```json
{
  "bundledDependencies": [
    "package-4"
  ]
}
```

## System

### `engines`

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

### `os`

```json
{
  "os": ["darwin", "linux"],
  "os": ["!win32"]
}
```

Checks against `process.platform`

### `cpu`

```json
{
  "cpu": ["x64", "ia32"],
  "cpu": ["!arm", "!mips"]
}
```

Checks against `process.arch`

## Publishing

### `private`

```json
{
  "private": true
}
```

### `publishConfig`

```json
{
  "publishConfig": {
    ...
  }
}
```
