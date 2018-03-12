---
layout     : post
title      : "Adding Command Line Aliases for Yarn"
author     : G. Kay Lee
author_url : "https://github.com/gsklee"
date       : 2017-06-19 00:00:00
categories : announcements
share_text : "Adding Command Line Aliases for Yarn"
---

One of the core design philosophies of Yarn is to strive for simpleness; a lean CLI without redundant features. That’s why Yarn has resisted adding random built-in shorthands like `npm r` or an aliases system like the one you can find in Git. We believe that the benefits they could possibly bring to the Yarn experience are not justified by the cost required to build and maintain such a full-fledged subsystem.

We’ve also noticed, however, that it is among one of the most common feature requests we received from the community. People do use aliases for several reasons, for example, to replicate their experiences from the `npm` command. The good news is, all modern shell environments actually support command aliases in one form or another, and we encourage you to improve your CLI experience using these ways that are baked into your favorite shell already.

Let’s say you check for package distribution tags information pretty often, are a report message addict as well as an emoji hater, and you’d like to have a handy shorthand for this common task. Below we’ve compiled a list of ways to add the command alias of `yarn info --verbose --no-emoji <package> dist-tags` in a number of popular shells for your convenience:

## Bash & Zsh

[Bash](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>) is the default shell on most Unix-like systems; together with [Zsh](https://en.wikipedia.org/wiki/Z_shell), they both descended from the earlier [Bourne shell](https://en.wikipedia.org/wiki/Bourne_shell) and hence syntaxes are largely compatible. To add a simple alias in either Bash or Zsh, simply have the following line added into your `.bashrc` or `.zshrc`, respectively:

```sh
alias ynf="yarn info --verbose --no-emoji"
```

Restart your shell and now you’ll be able to do:

```sh
ynf react dist-tags
```

```
yarn info v0.24.6
verbose 0.261 Checking for configuration file "/Users/gsklee/.npmrc".
verbose 0.262 Checking for configuration file "/Users/gsklee/.npmrc".
verbose 0.262 Checking for configuration file "/Users/gsklee/.nvm/versions/node/v8.1.2/.npmrc".
verbose 0.263 Checking for configuration file "/Users/gsklee/.npmrc".
verbose 0.263 Checking for configuration file "/Users/.npmrc".
verbose 0.265 Checking for configuration file "/Users/gsklee/.yarnrc".
verbose 0.265 Found configuration file "/Users/gsklee/.yarnrc".
verbose 0.267 Checking for configuration file "/Users/gsklee/.yarnrc".
verbose 0.267 Found configuration file "/Users/gsklee/.yarnrc".
verbose 0.268 Checking for configuration file "/Users/gsklee/.nvm/versions/node/v8.1.2/.yarnrc".
verbose 0.268 Checking for configuration file "/Users/gsklee/.yarnrc".
verbose 0.268 Found configuration file "/Users/gsklee/.yarnrc".
verbose 0.27 Checking for configuration file "/Users/.yarnrc".
verbose 0.274 current time: 2017-06-16T09:43:50.256Z
verbose 0.339 Performing "GET" request to "https://registry.yarnpkg.com/react".
verbose 0.488 Request "https://registry.yarnpkg.com/react" finished with status code 200.
{ latest: '15.6.1',
  '0.10.0-rc1': '0.10.0-rc1',
  '0.11.0-rc1': '0.11.0-rc1',
  next: '16.0.0-alpha.13',
  dev: '15.5.0-rc.2',
  '0.14-stable': '0.14.9',
  '15-next': '15.6.0-rc.1' }
Done in 0.28s.
```

Now, if you’d like to further alias the `dist-tags` part as well, you’ll need to use a function instead because Bash/Zsh aliases do not accept additional parameters:

```sh
function ynftag { yarn info --verbose --no-emoji "$@" dist-tags; }
```

You’ll then be able to get the same output by simply typing:

```sh
ynftag react
```

## Fish

[Fish](https://en.wikipedia.org/wiki/Friendly_interactive_shell) is a newer “[exotic shell](https://en.wikipedia.org/wiki/Unix_shell#Exotic_shells)” that deviates from traditional shell designs. It offers “abbreviations” that expand into full commands live as you type, much like the so-called snippets in modern code editors. To add an abbreviation:

```sh
abbr --add ynf yarn info --verbose --no-emoji
```

When it comes to passing in additional arguments, however, you have to use functions just like in Bash and Zsh:

```sh
function ynftag --wraps yarn --description "yarn info --verbose --no-emoji <package> dist-tags"
  yarn info --verbose --no-emoji $argv dist-tags
end
```

To persist your alias command definition, save it to your autoload directory:

```sh
funcsave ynftag
```

## Windows PowerShell

[PowerShell](https://en.wikipedia.org/wiki/PowerShell) is the default shell in current version of Windows. Unlike Unix shells which are built upon text processing and piping, inputs and outputs in PowerShell are .NET objects; as such, aliases in PowerShell do not work as string substitutions, but rather pointers to existing functions. This means that you’ll need to use functions to define your aliases whether additional parameters are involved or not.

Here is a [guidelines-abiding](https://msdn.microsoft.com/en-us/library/ms714428) example of the `ynftag` alias:

```sh
function Get-NpmPackageDistributionTags { yarn info --verbose --no-emoji @Args dist-tags }
New-Alias ynftag Get-NpmPackageDistributionTags
```

Here's a yarn alias that re-adds the `ls` command to list packages:

```sh
# yarn broke 'ls'
# Scope private do we don't call yarn recursively!
function Private:yarn() {
	$modifiedArgs = @()
	foreach ( $arg in $args ) {
		if ( $arg -cmatch '^ls$' ) {
			$arg = 'list'
		}
		$modifiedArgs += $arg
	}
	& yarn $modifiedArgs
}
```

Save the code above to one of the many [PowerShell profiles](https://blogs.technet.microsoft.com/heyscriptingguy/2013/01/04/understanding-and-using-powershell-profiles/) that suits you best to persist the definition.

## Command Prompt (`cmd`)

If you’re still using the clunky Command Prompt, we believe that it’d be better for you, in the long run, to learn to use PowerShell instead. It’s more capable, modern, and everything is just way more consistent. Nonetheless, here is how you define an alias within the current Command Prompt instance:

```sh
doskey ynftag=yarn info --verbose --no-emoji $* dist-tags
```

Since Command Prompt doesn’t come with a `.bashrc` equivalent, in order to persist your aliases permanently, you’ll need to create a custom `cmdrc.cmd` file (could be any name, but we recommend you to stick with the long-standing naming convention) inside your home directory, with the following content:

```sh
@echo off
doskey ynftag=yarn info --verbose --no-emoji $* dist-tags
```

Then modify your Command Prompt shortcut target to:

```sh
# Replace `cmdrc.cmd` with the full path that leads to the file.

cmd.exe /k cmdrc.cmd
```

## In Conclusion

Yarn is a powerful JavaScript tool, but it’s also a tool that resides in your shell environment. By leveraging the innate capabilities of your shell, Yarn can do far more for you right now and right away.
