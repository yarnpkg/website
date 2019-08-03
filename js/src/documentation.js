import docsearch from 'docsearch.js';
import { docsearch as config } from './util/config';

docsearch({
  apiKey: config.apiKey,
  indexName: config.indexName,
  inputSelector: '#algolia-doc-search',
  algoliaOptions: { filters: `lang:${window.i18n.active_language}` },
});
