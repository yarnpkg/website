---
id: docs_plugnplay_getting_started
guide: docs_plugnplay
layout: guide
---

{% include vars.html %}

Getting started with Plug'n'Play isn't difficult - at its basis it just involves enabling one tiny settings in your `package.json` file: `installConfig.pnp`.

```json
{
  "installConfig": {
    "pnp": true
  }
}
```

From now on each time you'll run `yarn install` Yarn will create a single file named `.pnp.js` instead of the `node_modules` megafolder. You can try it right now by running `yarn --pnp` in your project, which will enable the settings and run the install in the same pass!

So enabling PnP isn't complicated at all - what might be an issue are third-party packages that reimplement the Node resolution themselves. Three major implementations exist, more might also hide from a project to another:

- [`resolve`](https://yarnpkg.com/en/package/resolve) is the main one, and is supported out-of-the-box thanks to the help of [Jordan Harband](https://github.com/ljharb). Every package using `resolve` (and that includes things you might have heard of like Babel or Gulp) now works with further configuration.

- [`enhanced-resolve`](https://yarnpkg.com/en/package/enhanced-resolve) is the second biggest one. You probably use it but might never have heard about it: it's the resolver used by Webpack. We do support this resolver through the [pnp-webpack-plugin](https://github.com/arcanis/pnp-webpack-plugin) addon.

- TypeScript uses its own resolver as well. In this case the situation is a bit more complex - the TS team has some concerns about [allowing third-party hooks](https://github.com/Microsoft/TypeScript/issues/18896) inside the `tsc` compiler, meaning that we can't work with it at the moment. That being said, TypeScript isn't only `tsc` and as such we've been able to add PnP support to the popular [`ts-loader`](https://yarnpkg.com/en/package/ts-loader) - meaning that as long as you compile your TypeScript through Webpack, everything works well! Consult the dedicated [section](https://github.com/arcanis/pnp-webpack-plugin#ts-loader-integration) about it for more information.

In case you find something not working, consult the Troubleshooting section for some tips, then open an issue if things still are problematic. We really want PnP to become the de-facto installation strategy for Javascript packages and finally put `node_modules` behind us once and for all.
