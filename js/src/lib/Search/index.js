import React from 'react';
import qs from 'qs'
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch/dom';
import isEqual from 'lodash/isEqual';
import Results from './Results';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPush: 0,
      searchState: {
        ...qs.parse(location.search.substring(1))
      }
    }
  }

  componentWillReceiveProps() {
    this.setState({searchState: qs.parse(location.search.substring(1))});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state.searchState, nextState.searchState);
  }

  onSearchStateChange(nextSearchState) {
    const THRESHOLD = 700;
    const newPush = Date.now();
    this.setState({searchState: nextSearchState});
    delete nextSearchState.configure; // <Configure /> goes first
    if (newPush - this.state.lastPush >= THRESHOLD) {
      this.setState({lastPush: newPush});
      history.replaceState(nextSearchState, document.title, this.createURL(nextSearchState));
    }
  }

  createURL = state => `?${qs.stringify(state)}`;

  render() {
    return (
      <InstantSearch
        appId='OFCNCOG2CU'
        apiKey='f54e21fa3a2a0160595bb058179bfb1e'
        indexName='npm-search'
        className='pkg-search'
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange.bind(this)}
      >
        <Configure
          hitsPerPage={5}
          optionalFacetFilters={`name:${this.state.searchState.query}`}
          facets={['keywords']}
        />
        <SearchBox 
          translations={{
            placeholder: "Search packages (i.e. babel, webpack, react…)"
          }}
        />
        <Results />
      </InstantSearch>
    );
  }
};

export default Search;
