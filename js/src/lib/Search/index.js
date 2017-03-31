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

// add concatenated name for more relevance for people spelling without spaces
// think: createreactnative instead of create-react-native-app
const concat = string => string.replace(/[-/@_.]+/g, '');

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
        props.searchState.query &&
          `concatenatedName:${concat(props.searchState.query)}`
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
      autoFocus={window.location.pathname.includes('/packages')}
      translations={{
        placeholder: window.i18n.search_placeholder,
      }}
    />
    <Results />
  </InstantSearch>
);

export default withUrlSync(Search);
