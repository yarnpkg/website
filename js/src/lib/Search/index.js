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
import isEqual from 'lodash/isEqual';
import Results from './Results';
import withUrlSync from './withUrlSync';

const Search = props => (
  <InstantSearch
    appId="OFCNCOG2CU"
    apiKey="f54e21fa3a2a0160595bb058179bfb1e"
    indexName="npm-search"
    searchState={props.searchState}
    onSearchStateChange={props.onSearchStateChange}
  >
    <Configure
      hitsPerPage={5}
      // optionalFacetFilters={`name:${this.state.searchState.query}`}
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
      autoFocus={window.location.pathname.includes('/packages')}
      translations={{
        placeholder: window.i18n.search_placeholder,
      }}
    />
    <Results />
  </InstantSearch>
);

export default withUrlSync(Search);
