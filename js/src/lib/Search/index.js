import React from 'react';
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch/dom';
import Results from './Results';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  onSearchStateChanged(nextSearchState) {
    console.dir(nextSearchState);
    this.setState({
      query: nextSearchState
    });
  }

  render() {
    return (
      <InstantSearch
        appId='OFCNCOG2CU'
        apiKey='f54e21fa3a2a0160595bb058179bfb1e'
        indexName='npm-search'
        className='pkg-search'
      >
        <Configure
          hitsPerPage={5}
          optionalFacetFilters={`name:${this.state.query}`}
        />
        <SearchBox />
        <Results />
      </InstantSearch>
    );
  }
};

export default Search;
