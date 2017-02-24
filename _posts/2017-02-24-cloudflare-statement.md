---
layout     : post
title      : "The recent Cloudflare security incident and impact on Yarn users"
author     : Sebastian McKenzie
author_url : "https://twitter.com/sebmck"
date       : 2017-02-24 14:00:00
categories : announcements
share_text : "Yarn statement on recent Cloudflare security incident"
---

Yarn uses its own proxy to the npm registry in order to allow us to experiment
with the way the Yarn client works and allow optimizations in the future around
how packages are resolved. This registry is used by all Yarn users by default.

In order to do this we use the popular service, Cloudflare, which is used by
thousands of companies and who had offered to work with us to make Yarn installs
faster globally.

Recently it was [reported](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/)
that Cloudflare had a serious bug that was leading to requests from other websites
being leaked into HTTP responses.

When it comes to registry authentication, the Yarn client differs from the npm
client  n that when we perform authentication we do not store the resulting token
and invalidate it after it's used.

However, Yarn still allows you to login with your npm account to perform actions
such as publishing and downloading private packages. Out of the 70 million requests
performed daily we only get 10-30 requests that involve registry authentication.
This means that for these requests there was the possibility of user passwords
being leaked.

Since the Cloudflare announcement we've been in contact and have been assured
that the Yarn has not been affected and no Yarn users data has been leaked. Even
with this assurance we'd recommend that if you're one of those 30 people using Yarn
for registry authentication that you reset your password as a precautionary measure.

As a result of this we're evaluating our security policy and have created a new email
address security@yarnpkg.com (mailto:security@yarnpkg.com) that can be used to report
security vulnerabilities without going through the public issue tracker, we're also in
the process of setting up a HackerOne account and will make an announcement when this
is available.

We'd like to apologize for this disruption and want to reaffirm our commitment to securit
 and transparency in cases like these.
