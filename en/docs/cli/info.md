---
id: docs_cli_info
guide: docs_cli
layout: guide
---
<p class="lead">Show information about a package.</p>

##### `yarn info <package> [<field>]` <a class="toc" id="toc-yarn-info" href="#toc-yarn-info"></a>

This command will fetch information about a package and return it in a tree
format. The package does not have to have been installed locally.

```
$ yarn info left-pad

yarn info vx.x.x
{ name: 'left-pad',
  version: '1.1.2',
  description: 'String left pad',
  time: { modified: '2016-09-24T10:25:01.998Z', ... } ... }
```

The default reporting style for this command is a single-quoted serialization.
To emit lines of valid JSON, use the standard `--json` flag:

```
yarn info left-pad --json

{"type":"inspect","data":{"name":"left-pad","time":{...}}}
{"type":"finished","data":417}
```

### Information for a specific version <a class="toc" id="toc-information-for-a-specific-version" href="#toc-information-for-a-specific-version"></a>

Append `@[version]` to the package argument to provide information specific to
that version:

```
$ yarn info left-pad@0.0.1

yarn info vx.x.x
{ name: 'left-pad',
  version: '0.0.1',
  description: 'String left pad',
  time: { modified: '2016-09-24T10:25:01.998Z', ... } ... }
```

### Selecting specific fields <a class="toc" id="toc-selecting-specific-fields" href="#toc-selecting-specific-fields"></a>

If the optional field argument is provided, then only that part of the tree is
returned.

```
$ yarn info left-pad description

yarn info vx.x.x
String left pad
```

If the specified field is in turn a nested object, the child tree is returned:

```
$ yarn info left-pad time

yarn info vx.x.x
{ modified: '2016-09-24T10:25:01.998Z',
  created: '2014-03-14T09:09:20.762Z', ... }

yarn info left-pad time --json
{"type":"inspect","data":{"modified":"2016-09-24T10:25:01.998Z","created":...}}
...
```

### Retrieving the readme field <a class="toc" id="toc-retrieving-the-readme-field" href="#toc-retrieving-the-readme-field"></a>

Note that by default, `yarn info` will not return the `readme` field (since it
is often very long). To explicitly request that field, use the second argument:

```
$ yarn info left-pad readme

yarn info vx.x.x
## left-pad

String left pad

Time complexity: **O(log(n))**
...
```
