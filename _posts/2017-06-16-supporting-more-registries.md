---
layout     : post
title      : "Private Registry Support"
author     : Lukas Spieß
author_url : "https://twitter.com/lumaxis"
date       : 2017-06-16 12:00:00
categories : announcements
share_text : "Yarn now supports even more private registries"
---


Today, Yarn already supports a wide variety of different package feeds when fetching and downloading your dependencies. Up until now, there was however a small subset of public and private package feed providers that Yarn could not yet handle very well. One example of these package feed providers that were not yet supported was [Visual Studio Team Services](https://www.visualstudio.com/team-services/) (VSTS).

Let's explain why:

### Registry and package location URL differences

Some registries, such as VSTS, use two slightly different URL structures for the location of the package feed and the location of the actual package archive binary itself.  
For example, a private feed's URL would look like this:

```
// Package feed URL
https://$ACCOUNT_NAME.pkgs.visualstudio.com/_packaging/$FEED_NAME/npm/registry
```

but the URLs to fetch the actual tar archives would then be returned by the feed in this format:

```
// Package archive URL
https://$ACCOUNT_NAME.pkgs.visualstudio.com/_packaging/da6e033f-20ad-4ee1-a784-8995dd6836b72/npm/registry/@scope/package-name/-/package-name-0.0.1.tgz
```

As you can see, the archive's URL does not contain the actual feed name anymore but rather a random GUID, followed by the package name and version. This differing layout of the path part of the URL lead to Yarn not recognizing that the two URLs actually both do belong to a request to the same registry and would therefore refuse to download the package.

### Introducing custom host suffixes

Starting with version `0.26.0`, Yarn now understands a new configuration option called `custom-host-suffix`. This allows you to keep the same strict URL validations for most of your package URLs but also selectively loosen that check for a specific registry provider so that Yarn will now match the URLs where the host part ends with the value from this new option.

Simply add `custom-host-suffix` to either your global user-level `.npmrc` or your project's individual `.npmrc` and Yarn will be able to download your packages as desired.
In the above example of Visual Studio Team Services, the `.npmrc` should contain an entry like this:

```
custom-host-suffix='pkgs.visualstudio.com'
```

We hope you will find this new option useful and are happy that Yarn can now be used in even more projects!
