---
id: docs_configuration_index
guide: docs_configuration
layout: guide
---

<!-- [TODO: Rewrite and accommodate for other configuration files] -->

## Configuring your package <a class="toc" id="toc-configuring-your-package" href="#toc-configuring-your-package"></a>

Yarn looks for `package.json` files to identify each package and configure the behavior of yarn while running inside that package.

An example configuration for the `pet-kitten` package, which would be found at `pet-kitten/package.json`:

```
{
  "name": "pet-kitten",
  "version": "0.1.0",
  "main": "pet.js",
  "dependencies": {
    "hand": "1.0.0"
  }
}
```

## Use `yarn.lock` to pin your dependencies <a class="toc" id="toc-use-yarn-lock-to-pin-your-dependencies" href="#toc-use-yarn-lock-to-pin-your-dependencies"></a>

Yarn also uses a `yarn.lock` file in the root of your project to make dependency resolution fast and reliable. You never need to touch this file, yarn owns it and will change it when managing dependencies.

To make sure your app works consistently, **you should always save the `yarn.lock` file in your code repository.**
