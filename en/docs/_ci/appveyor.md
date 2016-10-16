On [AppVeyor](https://www.appveyor.com/), you can install Yarn as part of your build by adding this to your `appveyor.yml`:

```yml
install:
  - choco install yarn
  - refreshenv
cache:
 - "%LOCALAPPDATA%/Yarn"
```

This will also save the Yarn cache directory across builds, to make your builds faster.
