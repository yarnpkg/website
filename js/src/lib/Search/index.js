import React, { Component } from 'react';
import qs from 'qs';
import { Configure, InstantSearch } from 'react-instantsearch/dom';
import { connectRefinementList } from 'react-instantsearch/connectors';

import SearchBox from './SearchBox';
import Results from './Results';
import withUrlSync from './withUrlSync';
import { algolia } from '../config';

// add concatenated name for more relevance for people spelling without spaces
// think: createreactnative instead of create-react-native-app
const concat = string => string.replace(/[-/@_.]+/g, '');

const VirtualRefinementList = connectRefinementList(() => null);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: new Set() };
    this.saveTags = this.saveTags.bind(this);
  }

  saveTags(newTags) {
    this.setState(({ tags }) => ({ tags: tags.add(...newTags) }));
  }

  render() {
    const {
      searchState,
      onSearchStateChange,
      searchState: { query },
    } = this.props;
    return (
      <InstantSearch
        appId={algolia.appId}
        apiKey={algolia.apiKey}
        indexName={algolia.indexName}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <Configure
          hitsPerPage={5}
          optionalFacetFilters={query && `concatenatedName:${concat(query)}`}
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
        <VirtualRefinementList
          attributeName="keywords"
          defaultRefinement={[...this.state.tags]}
        />
        <Results onTagClick={this.saveTags} />
      </InstantSearch>
    );
  }
}

export default withUrlSync(Search);
