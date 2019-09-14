---
id: docs_selective_version_resolutions
guide: docs_dependencies
description: docs_selective_version_resolutions_description
layout: guide
---

Yarn supports selective version resolutions, which lets you define custom package versions inside your dependencies through the `resolutions` field in your `package.json` file. Normally, this would
require manual edits in the `yarn.lock` file.

### Why would you want to do this? <a class="toc" id="toc-why-would-you-want-to-do-this" href="#toc-why-would-you-want-to-do-this"></a>

- You may be depending on a package that is not updated frequently, which depends on another package that got an important upgrade. In this case, if the version range specified by your direct dependency does not cover the new sub-dependency version, you are stuck waiting for the author.

- A sub-dependency of your project got an important security update and you don't want to wait for your direct-dependency to issue a minimum version update.

- You are relying on an unmaintained but working package and one of its dependencies got upgraded. You know the upgrade would not break things and you also don't want to fork the package you are relying on, just to update a minor dependency.

- Your dependency defines a broad version range and your sub-dependency just got a problematic update so you want to pin it to an earlier version.

### How to use it? <a class="toc" id="toc-how-to-use-it" href="#toc-how-to-use-it"></a>

Add a `resolutions` field to your `package.json` file and define your version overrides:

**package.json**

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "right-pad": "1.0.0",
    "jquery": "3.0.0",
    "lodash": "4.0.0"
  },
  "resolutions": {
     "**/right-pad": "1.0.0",
    "jquery/left-pad": "2.0.0",
    "lodash/**/left-pad": "2.0.0",
  }
}
```
In this example, the project `my-project` requires version `1.0.0` of `right-pad`. However, different dependencies like `jquery` or `lodash` may require other versions of `right-pad`. This can lead to multiple versions of `right-pad` being installed and used throughout your codebase. This can significantly increase the size of your application or website and so you may wish to enforce a single version of `right-pad` to be used. Another good reason to use resolutions is when one of your dependencies (indirectly) depends on a version of `right-pad` that contains a security vulnerability.

Resolutions can be applied at different scales, from "replace everything" to "replace only this one specific case".

The first resolution in this example replaces all versions of `right-pad` with `1.0.0`. This means that even if `jquery` would prefer a different version, it will still get the same version as all other packages that might depend on `right-pad`: `1.0.0`. This is the simplest solution, but it is also the most likely to lead to problems if the versions are too different, so use it carefully!

The second resolution has a smaller scope, and it only applies to the `jquery` you added as a dependency. Here, you will be enforcing that your `jquery` `3.0.0` will always use `left-pad` `2.0.0`, even if `jquery` wants to use another version. However, all other packages, like `lodash`, are still free to use any version of `left-pad` they prefer.

This scope can be combined with the scope to produce `**/jquery/left-pad`, in which case the resolution will also apply to other packages which rely on `jquery`, rather than just your own project.

The third example places the double star between two package names. This is very similar to the second example, but here any dependencies of `lodash` that in turn depend on `left-pad` will also be included.

Note that not one of these is the better resolution, as different use-cases require different resolutions and many different combinations can be made to widen or tighten the scope of the resolution.

Then run `yarn install`.

### Tips & Tricks <a class="toc" id="toc-tips-tricks" href="#toc-tips-tricks"></a>

- You will receive a warning if you define an invalid resolution (such as with an invalid package name)
- You will receive a warning if your resolution version or range is not valid.
- You will receive a warning if your resolution version or range is not compatible with the original version range.
- If you use version control, checking the difference in the `yarn.lock` file is an easy way to double-check your resolutions.

### Limitations & Caveats <a class="toc" id="toc-limitations-Caveats" href="#toc-limitations-Caveats"></a>

- Nested packages may not work properly.
- Certain edge-cases may not work properly since this is a fairly new feature.
