import React, {Component} from 'react';
import qs from 'qs';

const updateAfter = 700;
const searchStateToQueryString = searchState => ({q: searchState.query});
const searchStateToUrl = searchState => searchState ? `/packages?${qs.stringify(searchStateToQueryString(searchState))}` : '';
const queryStringToSearchState = queryString => ({query: qs.parse(queryString).q});
const originalPathName = location.pathname;

export default App => class extends Component {
  constructor() {
    super();
    this.state = {searchState: queryStringToSearchState(location.search.slice(1))};
    window.addEventListener( // check we are on a search result
      'popstate',
      ({state: searchState}) => {
        if (searchState !== null) {
          this.setState({searchState});
          return;
        }

        this.setState({searchState: {query: ''}});
      }
    );
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);

    if (searchState.query === '') {
      if (location.pathname !== originalPathName) {
        window.history.pushState(null, null, originalPathName);
      }
    } else {
      this.debouncedSetState = setTimeout(() => {
        window.history.pushState(
          searchState,
          null,
          searchStateToUrl(searchState)
        );
      }, updateAfter);
    }

    this.setState({searchState});
  };

  render() {
    return <App {...this.props}
      searchState={this.state.searchState}
      onSearchStateChange={this.onSearchStateChange.bind(this)}
      createURL={searchStateToUrl}
    />;
  }
};
