import React, { Component } from 'react';
import qs from 'qs';

const updateAfter = 700;
const searchStateToQueryString = ({ query, page, refinementList }) => ({
  ...(query && { q: query }),
  ...(page > 1 && { p: page }),
  ...(refinementList && {
    ...(refinementList['owner.name'] && {
      owner: refinementList['owner.name'],
    }),
    ...(refinementList.keywords && {
      keywords: refinementList.keywords,
    }),
  }),
});

const searchStateToUrl = searchState =>
  searchState
    ? `${window.i18n.url_base}/packages?${qs.stringify(
        searchStateToQueryString(searchState)
      )}`
    : '';

const queryStringToSearchState = queryString => {
  const { p, q, owner, keywords } = qs.parse(queryString);
  return {
    ...(q && { query: q }),
    ...(p && { page: p }),
    ...((keywords || owner) && {
      refinementList: {
        ...(keywords && { keywords }),
        ...(owner && { 'owner.name': owner }),
      },
    }),
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
