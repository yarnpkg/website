import React from 'react';
import qs from 'qs';
import { InstantSearch, Configure } from 'react-instantsearch/dom';
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
