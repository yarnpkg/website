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

## CentOS / Fedora / RHEL

On CentOS, Fedora and RHEL, you can install Yarn via our RPM package:

```sh
wget https://yarnpkg.com/latest.rpm
rpm -Uvh yarn-*.rpm
```

You will need to first [enable the NodeSource repository](https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora)
as CentOS does not include Node.js in its main repository.
