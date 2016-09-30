### Debian/Ubuntu Linux

On Debian or Ubuntu Linux, you can install Yarn via our Debian package
repository. You will first need to configure the repository:

```sh
sudo apt-key adv --keyserver pgp.mit.edu --recv 5364CA44
echo "deb https://yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Then you can simply:

```sh
sudo apt-get update && sudo apt-get install yarn
```
