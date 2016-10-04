---
id: docs_cli_login
guide: docs_cli
layout: guide
---

<p class="lead">Store registry username and email.</p>

##### `yarn login` <a class="toc" id="toc-yarn-login" href="#toc-yarn-login"></a>

Running this command will prompt you for your username and email for the
[npm registry](https://www.npmjs.com/). It will **not** ask for your password.
Later when you run a command that requires authentication such as
[`yarn publish`](publish), you will have to enter your password to do so.

```sh
yarn login
```

```sh
yarn login vx.x.x
question npm username: my-username
question npm email: my-username@example.com
✨  Done in 6.03s.
```

Using [`yarn logout`](logout) you can delete your username and email.
