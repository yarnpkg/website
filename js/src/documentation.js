import docsearch from 'docsearch.js';

docsearch({
  apiKey: '3949f721e5d8ca1de8928152ff745b28',
  indexName: 'yarnpkg',
  inputSelector: '#algolia-doc-search',
  algoliaOptions: { filters: `lang:${window.i18n.active_language}` },
});
