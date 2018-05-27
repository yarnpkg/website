<div class="install-only-stable" markdown="1">
On CentOS, Fedora and RHEL, you can install Yarn via our RPM package repository.
```sh
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
```

If you do not already have Node.js installed, you should also configure
[the NodeSource repository](https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora):

```sh
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
```

Then you can simply:

```sh
sudo yum install yarn
## OR ##
sudo dnf install yarn
```

</div>

<div class="install-only-rc install-only-nightly" markdown="1">
Currently, there are no RPM packages available for RC or nightly builds of Yarn. Please use the tarball:
{% include_relative _installations/tarball.md %}
</div>

### Path Setup

<!-- prettier-ignore -->
{% include_relative _installations/unix_path_setup.md %}