import React from 'react';
import qs from 'qs';
import Configure from 'react-instantsearch/src/widgets/Configure';

import createInstantSearch
  from 'react-instantsearch/src/core/createInstantSearch';
import algoliasearch from 'algoliasearch';

const InstantSearch = createInstantSearch(algoliasearch, {
  Root: 'div',
  props: { className: 'ais-InstantSearch__root' },
});

import SearchBox from './SearchBox';
import Results from './Results';
import withUrlSync from './withUrlSync';
import { algolia } from '../config';

const Search = props => (
  <InstantSearch
    appId={algolia.appId}
    apiKey={algolia.apiKey}
    indexName={algolia.indexName}
    searchState={props.searchState}
    onSearchStateChange={props.onSearchStateChange}
  >
    <Configure
      hitsPerPage={5}
      optionalFacetFilters={
        props.searchState.query && `name:${props.searchState.query}`
      }
      facets={['keywords']}
      attributesToRetrieve={[
        'name',
        'downloadsLast30Days',
        'humanDownloadsLast30Days',
        'license',
        'version',
        'description',
        'modified',
        'keywords',
        'homepage',
        'githubRepo',
        'owner',
      ]}
    />
    <SearchBox
      translations={{
        placeholder: window.i18n.search_placeholder,
      }}
    />
    <Results />
  </InstantSearch>
);

export default withUrlSync(Search);
