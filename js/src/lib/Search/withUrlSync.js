import React, { Component } from 'react';
import qs from 'qs';
import { searchLink } from '../util';
const updateAfter = 700;
const searchStateToQueryString = ({
  query,
  page,
  refinementList: { 'owner.name': owner = [], keywords = [] } = {},
}) => ({
  q: query,
  p: page === 1 ? undefined : page,
  owner: owner.length === 1 ? owner[0] : undefined,
  keywords: keywords.length > 0 ? keywords : undefined,
});

const searchStateToUrl = searchState =>
  searchState ? searchLink(searchStateToQueryString(searchState)) : '';

const queryStringToSearchState = queryString => {
  const { p, q, owner, keywords } = qs.parse(queryString);
  return {
    query: q,
    page: p || 1,
    refinementList: {
      ...(keywords && { keywords }),
      ...(owner && { 'owner.name': [owner] }),
    },
  };
};

const originalPathName = location.pathname;

export default App =>
  class extends Component {
    constructor() {
      super();
      this.state = {
        searchState: queryStringToSearchState(location.search.slice(1)),
      };
      window.addEventListener('popstate', ({ state: searchState }) => {
        // check we are on a search result
        if (searchState !== null) {
          this.setState({ searchState });
          return;
        }

        this.setState({ searchState: { query: '', page: 1 } });
      });
    }

    onSearchStateChange = searchState => {
      clearTimeout(this.debouncedSetState);

      if (searchState.query === '') {
        if (location.pathname !== originalPathName) {
          window.history.pushState(
            null,
            'Search packages | Yarn',
            originalPathName
          );
        }
      } else {
        this.debouncedSetState = setTimeout(() => {
          window.history.pushState(
            searchState,
            'Search packages | Yarn',
            searchStateToUrl(searchState)
          );
        }, updateAfter);
      }

      this.setState({ searchState });
    };

    render() {
      return (
        <App
          {...this.props}
          searchState={this.state.searchState}
          onSearchStateChange={this.onSearchStateChange.bind(this)}
          createURL={searchStateToUrl}
        />
      );
    }
  };
