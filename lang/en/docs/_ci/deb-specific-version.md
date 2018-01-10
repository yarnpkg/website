It is recommended that you lock in a specific version of Yarn, so that all your builds use the same version of Yarn, and you can test new Yarn releases before switching over. You can do this by adding the version number to the `apt-get install` call:

```
sudo apt-get install -y -qq yarn={{site.latest_version}}-1
```
