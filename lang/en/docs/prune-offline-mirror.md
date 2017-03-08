---
id: docs_prune_offline_mirror
guide: docs_offline_mirror
layout: guide
---

After you configure your offline mirror, Yarn will automatically add new
package tarballs to the mirror. However, it does not automatically remove
tarballs that are no longer referenced in `yarn.lock`. For example, if you `$
yarn remove` a dependency, the tarball will remain in the mirror, even if no
other dependencies have it has a sub-dependency. This behavior can be desirable
in a setting where many projects share the same mirror, but when that is not
the case, you may want to have Yarn remove unnecessary tarballs.

To turn on automating pruning, set `yarn-offline-mirror-pruning` to `true` in
your `.yarnrc`:

`$ yarn config set yarn-offline-mirror-pruning true`

Now, tarballs will be removed when appropriate. The end result is that
`package.json`, `node_modules`, `yarn.lock`, and the offline mirror should all
remain perfectly in sync whenever you change your project's dependencies.
