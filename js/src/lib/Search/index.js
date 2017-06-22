import React from 'react';
import qs from 'qs';
import { Configure, InstantSearch } from 'react-instantsearch/dom';

import SearchBox from './SearchBox';
import Results from './Results';
import withUrlSync from './withUrlSync';
import { algolia } from '../config';

// add concatenated name for more relevance for people spelling without spaces
// think: createreactnative instead of create-react-native-app
const concat = string => string.replace(/[-/@_.]+/g, '');

const Search = props =>
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
        'deprecated',
        'description',
        'downloadsLast30Days',
        'githubRepo',
        'homepage',
        'humanDownloadsLast30Days',
        'keywords',
        'license',
        'modified',
        'name',
        'owner',
        'version',
      ]}
    />
    <SearchBox
      autoFocus={window.location.pathname.includes('/packages')}
      translations={{
        placeholder: window.i18n.search_placeholder,
      }}
    />
    <Results />
  </InstantSearch>;

export default withUrlSync(Search);
