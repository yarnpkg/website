---
id: docs_selective_version_resolutions
guide: docs_selective_version_resolutions
layout: guide
---

Yarn supports selective version resolutions, which lets you define custom package versions inside your dependencies through the `resolutions` field in your `package.json` file. Normally, this would
require manual edits in the `yarn.lock` file.

### Why would you want to do this? <a class="toc" id="toc-why-would-you-want-to-do-this" href="#toc-why-would-you-want-to-do-this"></a>

- You may be depending on a package that is not updated frequently, which depends on another package that got an important upgrade. In this case, if the version range specified by your direct dependency does not cover the new sub-dependency version, you are stuck waiting for the author.

- A sub-dependency of your project got an important security update and you don't want to wait for your direct-dependency to issue a minimum version update.

- You are relying on an unmaintained but working package and one of its dependencies got upgraded. You know the ugprade would not break things and you also don't want to fork the package you are relying on, just to update a minor dependency.

- Your dependency defines a broad version range and your sub-dependency just got a problematic update so you want to pin it to an earlier version.

### How to use it? <a class="toc" id="toc-how-to-use-it" href="#toc-how-to-use-it"></a>

Add a `resolutions` field to your `package.json` file and define your version overrides:

**package.json**

```json
{
  "name": "project",
  "version": "1.0.0",
  "dependencies": {
    "left-pad": "1.0.0",
    "c": "file:../c-1",
    "d2": "file:../d2-1"
  },
  "resolutions": {
    "d2/left-pad": "1.1.1",
    "c/**/left-pad": "1.1.2"
  }
}
```

Then run `yarn install`.

### Tips & Tricks <a class="toc" id="toc-tips-tricks" href="#toc-tips-tricks"></a>

  - You will receive a warning if you define an invalid resolution (such as with an invalid package name)
  - You will receive a warning if your resolution version or range is not valid.
  - You will receive a warning if your resolution version or range is not compatible with the original version range.

### Limitations & Caveheats <a class="toc" id="toc-limitations-caveheats" href="#toc-limitations-caveheats"></a>

  - Nested packages may nor work properly.
  - Certain edge-cases may not work properly since this is a fairly new feature.
