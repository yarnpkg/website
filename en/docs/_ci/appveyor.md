Yarn is [now preinstalled on AppVeyor](https://www.appveyor.com/updates/2016/11/01/), so you don't need to do anything extra in order to use it as part of your build! To speed up your builds, you can cache Yarn's cache folder by adding this to your `appveyor.yml`:

```yml
cache:
 - "%LOCALAPPDATA%/Yarn"
```
