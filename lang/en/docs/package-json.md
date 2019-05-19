---
id: docs_configuration_package_json
guide: docs_configuration
layout: guide
---

{% include vars.html %}

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

The current version of your package.

## Info <a class="toc" id="toc-info" href="#toc-info"></a>

### `description` <a class="toc" id="toc-description" href="#toc-description"></a>

```json
{
  "description": "My short description of my awesome package"
}
```

The description is just a string that helps people understand the purpose of the package. It can be used when searching for packages in a package manager as well.

### `keywords` <a class="toc" id="toc-keywords" href="#toc-keywords"></a>

```json
{
  "keywords": ["short", "relevant", "keywords", "for", "searching"]
}
```

Keywords are an array of strings that are useful when searching for packages in a package manager.

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

Various links to documentation, places to file issues and where your package code actually lives.

### `homepage` <a class="toc" id="toc-homepage" href="#toc-homepage"></a>

```json
{
  "homepage": "https://your-package.org"
}
```

The homepage is the URL to the landing page or documentation for your package.

### `bugs` <a class="toc" id="toc-bugs" href="#toc-bugs"></a>

```json
{
  "bugs": "https://github.com/user/repo/issues"
}
```

The URL to your project's issue tracker. This can also be something like an email address as well. It provides users a way to find out where to send issues with your package.

### `repository` <a class="toc" id="toc-repository" href="#toc-repository"></a>

```json
{
  "repository": { "type": "git", "url": "https://github.com/user/repo.git" },
  "repository": "github:user/repo",
  "repository": "gitlab:user/repo",
  "repository": "bitbucket:user/repo",
  "repository": "gist:a1b2c3d4e5f"
}
```

The repository is the location where the actual code for your package lives.

## Maintainers <a class="toc" id="toc-maintainers" href="#toc-maintainers"></a>

The maintainers of your project.

### `author` <a class="toc" id="toc-author" href="#toc-author"></a>

```json
{
  "author": {
    "name": "Your Name",
    "email": "you@example.com",
    "url": "http://your-website.com"
  },
  "author": "Your Name <you@example.com> (http://your-website.com)"
}
```

Package author information. An author is one person.

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

Those that have contributed to your package. Contributors are an array of people.

## Files <a class="toc" id="toc-files" href="#toc-files"></a>

You can specify files that will be included in your project, along with the main entry point for your project.

### `files` <a class="toc" id="toc-files" href="#toc-files"></a>

```json
{
  "files": ["filename.js", "directory/", "glob/*.{js,json}"]
}
```

These are files that are included in your project. You can specify single files, whole directories or use wildcards to include files that meet a certain criteria.

### `main` <a class="toc" id="toc-main" href="#toc-main"></a>

```json
{
  "main": "filename.js"
}
```

This is the primary entry point for the functionality for your project.

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

Executable files included with your project that will be installed.

### `man` <a class="toc" id="toc-man" href="#toc-man"></a>

```json
{
  "man": "./man/doc.1",
  "man": ["./man/doc.1", "./man/doc.2"]
}
```

If you have man pages associated with your project, add them here.

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

When installing your package, you can specify exact locations to put binary files, man pages, documentation, examples, etc.

## Tasks <a class="toc" id="toc-tasks" href="#toc-tasks"></a>

Your package can include runnable scripts or other configuration.

### `scripts` <a class="toc" id="toc-scripts" href="#toc-scripts"></a>

```json
{
  "scripts": {
    "build-project": "node build-project.js"
  }
}
```

Scripts are a great way of automating tasks related to your package, such as simple build processes or development tools. Using the `"scripts"` field, you can define various scripts to be run as `yarn run <script>`. For example, the `build-project` script above can be invoked with `yarn run build-project` and will run `node build-project.js`.

Certain script names are special. If defined, the `preinstall` script is called by yarn before your package is installed. For compatibility reasons, scripts called `install`, `postinstall`, `prepublish`, and `prepare` will all be called after your package has finished installing.

The `start` script value defaults to `node server.js`.

As an alternative, scripts may also be imported from a javascript file.  This allows for customization such as comments, metadata and structuring or grouping scripts.

```json
{
  "scripts": "package-scripts.js",  
}
```

For defining scripts within the js file, the following structures are supported:

1.  Structure as a standard object hash inside of the scripts object.  This is identical to how scripts are specified in the     packages.json file with the additional ability of comments.    

        module.exports = {
          scripts: {
            "build-project": "node build-project.js" // Build project
          },
        };

2.  Structure a script as an object with a 'script' key.  This allows for additional metadata to be co-located with an associated script. When a script key is specified within an object, the object's remaining non object values are ignored.  Remaining objects are imported normally.

        module.exports = {
          scripts: {
            "test": {
              script: "node test-project.js",
              description: "Run tests",                
            },
            "build-project": "node build-project.js"
          },
        };

3.  Group scripts together using objects with an optional 'default' key.  When scripts are grouped together, the script name or key will be generated from the object hierarchy and the delimiter.  If no delimiter is specified, then '.' will be used by default.  For example, the test.watch script below will be exposed via 'yarn test.watch'.  If a script is specified under an object's 'default' key, it will inherit the parent name.  In the below example, the test.default script will be exposed via 'yarn test'.

        module.exports = {
          delimiter: '.',
          scripts: {
            "test": {
              default: "cross-env CI=1 react-scripts test --env=jsdom",                
              watch: "react-scripts test --env=jsdom",
            },            
            "build": "rollup -c",
            "start": "rollup -c -w",            
          },
        };

### `config` <a class="toc" id="toc-config" href="#toc-config"></a>

```json
{
  "config": {
    "port": "8080"
  }
}
```

Configuration options or parameters used in your scripts.

## Dependencies <a class="toc" id="toc-dependencies" href="#toc-dependencies"></a>

Your package will very likely depend on other packages. You can specify those dependencies in your `package.json` file.

### `dependencies` <a class="toc" id="toc-dependencies" href="#toc-dependencies"></a>

```json
{
  "dependencies": {
    "package-1": "^3.1.4"
  }
}
```

These are dependencies that are required in both development and production for your package.

> You can specify an exact version, a minimum version (e.g., `>=`) or a range of versions (e.g. `>= ... <`).

### `devDependencies` <a class="toc" id="toc-devdependencies" href="#toc-devdependencies"></a>

```json
{
  "devDependencies": {
    "package-2": "^0.4.2"
  }
}
```

These are packages that are only required when developing your package but will not be installed in production.

### `peerDependencies` <a class="toc" id="toc-peerdependencies" href="#toc-peerdependencies"></a>

```json
{
  "peerDependencies": {
    "package-3": "^2.7.18"
  }
}
```

Peer dependencies allow you to state compatibility of your package with versions of other packages.

### `optionalDependencies` <a class="toc" id="toc-optionaldependencies" href="#toc-optionaldependencies"></a>

```json
{
  "optionalDependencies": {
    "package-5": "^1.6.1"
  }
}
```

Optional dependencies can be used with your package, but are not required. If the optional package is not found, installation still continues.

### `bundledDependencies` <a class="toc" id="toc-bundleddependencies" href="#toc-bundleddependencies"></a>

```json
{
  "bundledDependencies": ["package-4"]
}
```

Bundled dependencies are an array of package names that will be bundled together when publishing your package.

### `flat` <a class="toc" id="toc-flat" href="#toc-flat"></a>

```json
{
  "flat": true
}
```

If your package only allows one version of a given dependency, and you'd like to enforce the same behavior as [`yarn install --flat`]({{url_base}}/docs/cli/install#toc-yarn-install-flat) on the command line, set this to `true`.

Note that if your `package.json` contains `"flat": true` and other packages depend on yours (e.g. you are building a library rather than an application), those other packages will also need `"flat": true` in their `package.json` or be installed with `yarn install --flat` on the command line.

### `resolutions` <a class="toc" id="toc-resolutions" href="#toc-resolutions"></a>

```json
{
  "resolutions": {
    "transitive-package-1": "0.0.29",
    "transitive-package-2": "file:./local-forks/transitive-package-2",
    "dependencies-package-1/transitive-package-3": "^2.1.1"
  }
}
```

Allows you to override a version of a particular nested dependency. See [the Selective Versions Resolutions RFC](https://github.com/yarnpkg/rfcs/blob/master/implemented/0000-selective-versions-resolutions.md) for the full spec.

Note that installing dependencies via [`yarn install --flat`] will automatically add a `resolutions` block to your `package.json` file.

## System <a class="toc" id="toc-system" href="#toc-system"></a>

You can provide system-level information associated with your package, such as operating system compatibility, etc.

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

The engines specify versions of clients that must be used with your package. This checks against `process.versions` as well as the current version of yarn.

This check follows normal semver rules with one exception. It allows prerelease versions to match semvers that do not explicitly specify a prerelease. For example, `1.4.0-rc.0` matches `>=1.3.0`, while it would not match a typical semver check.

### `os` <a class="toc" id="toc-os" href="#toc-os"></a>

```json
{
  "os": ["darwin", "linux"],
  "os": ["!win32"]
}
```

This specifies operating system compatibility for your package. It checks against `process.platform`.

### `cpu` <a class="toc" id="toc-cpu" href="#toc-cpu"></a>

```json
{
  "cpu": ["x64", "ia32"],
  "cpu": ["!arm", "!mips"]
}
```

Use this to specify your package will only run on certain CPU architectures. This checks against `process.arch`.

## Publishing <a class="toc" id="toc-publishing" href="#toc-publishing"></a>

### `private` <a class="toc" id="toc-private" href="#toc-private"></a>

```json
{
  "private": true
}
```

If you do not want your package published in a package manager, set this to `true`.

### `publishConfig` <a class="toc" id="toc-publishconfig" href="#toc-publishconfig"></a>

```json
{
  "publishConfig": {
    ...
  }
}
```

These configuration values will be used when publishing your package. You can tag your package, for example.
