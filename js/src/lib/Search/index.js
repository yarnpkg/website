import React from 'react';
import qs from 'qs'
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch/dom';
import isEqual from 'lodash/isEqual';
import Results from './Results';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.lastPush = 0;
    this.originalURL = location.href;
    this.previousURL = '';
    this.state = {
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
    console.log(nextSearchState.configure, nextSearchState);
    delete nextSearchState.configure; // <Configure /> goes first
    if (nextSearchState.query.length < 1) {
      if (this.previousURL !== this.originalURL) {
        this.previousURL = this.originalURL;
        history.pushState({}, document.title, this.originalURL);
      }
    } else if (newPush - this.lastPush >= THRESHOLD) {
      this.lastPush = newPush;
      history.replaceState({}, 'Yarn Search', this.createURL(nextSearchState));
    }
  }

  createURL = state => `/packages?${qs.stringify(state)}`;

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
