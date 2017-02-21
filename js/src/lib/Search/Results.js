import React from 'react';
import { createConnector } from 'react-instantsearch';
import { Hits, Pagination, CurrentRefinements } from 'react-instantsearch/dom';
import Hit from './Hit';
import { isEmpty } from './util';

const body = document.querySelector('body');

const ResultsFound = ({ pagination }) => (
  <div className="container">
    <CurrentRefinements />
    <Hits hitComponent={Hit} />
    <div className="d-flex">
      {pagination
        ? <Pagination showFirst={false} showLast={false} scrollTo={true} />
        : <div style={{ height: '3rem' }} />}
    </div>
    <div className="search-footer">
      {window.i18n.search_by_algolia}
      {' - '}
      <a
        href="https://discourse.algolia.com/t/2016-algolia-community-gift-yarn-package-search/319"
      >
        {window.i18n.search_by_read_more}
      </a>
      .
    </div>
  </div>
);

const Results = createConnector({
  displayName: 'ConditionalResults',
  getProvidedProps(props, searchState, searchResults) {
    const pagination = searchResults.results
      ? searchResults.results.nbPages > 1
      : false;
    const noResults = searchResults.results
      ? searchResults.results.nbHits === 0
      : false;
    return { query: searchState.query, noResults, pagination };
  },
})(({ noResults, pagination, query }) => {
  if (isEmpty(query)) {
    body.classList.remove('searching');
    return <span />;
  } else if (noResults) {
    body.classList.add('searching');
    return (
      <div className="container text-center mt-5">
        No package {query} was found
      </div>
    );
  } else {
    body.classList.add('searching');
    return <ResultsFound pagination={pagination} />;
  }
});

export default Results;
