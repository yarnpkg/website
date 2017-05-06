Yarn is pre-installed [Codeship Basic](https://codeship.com/features/basic).

```sh
curl -o- -L https://yarnpkg.com/install.sh | bash
export PATH=$HOME/.yarn/bin:$PATH
```

If you are using [Codeship Pro](https://pages.codeship.com/docker) (with
Docker), it is recommended to install Yarn
via [our Debian/Ubuntu package](https://yarnpkg.com/en/docs/install#linux)
instead.
