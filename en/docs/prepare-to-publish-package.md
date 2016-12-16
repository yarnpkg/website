---
id: docs_prepare_to_publish_package
guide: docs_creating_a_package
layout: guide
---

After [creating your package](creating-a-package), you will want to prepare to have it published to npm. The preparation steps are relatively small, but important.

- The your package code and metadata should be hosted in a public repository, such as [GitHub](https://github.com).
- You should have a `LICENSE` and `README` in your repository, describing the terms on which your package can be used and how to install your package, respectively.
- To publish a package, you must have a user in the npm registry. If you do not have a user, then create one with `npm adduser`; otherwise, you can then use `yarn login` to store your credentials locally for publishing later.
