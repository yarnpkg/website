<div class="install-only-stable" markdown="1">
On openSUSE, you can install Yarn via our RPM package repository.

```
sudo zypper ar -f https://dl.yarnpkg.com/rpm/ Yarn
sudo zypper in yarn
```

</div>

<div class="install-only-rc install-only-nightly" markdown="1">
Currently, there are no openSUSE packages available for RC or nightly builds of Yarn. Please use the tarball:
{% include_relative _installations/tarball.md %}
</div>

### Path Setup

<!-- prettier-ignore -->
{% include_relative _installations/unix_path_setup.md %}