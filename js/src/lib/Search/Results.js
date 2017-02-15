import React from 'react';
import { createConnector } from 'react-instantsearch';
import { Hits, Pagination } from 'react-instantsearch/dom';
import Hit from './Hit';
import { isEmpty } from './util';

const body = document.querySelector('body');

const Results = createConnector({
  displayName: 'ConditionalResults',
  getProvidedProps(props, searchState, searchResults) {
    const noResults = searchResults.results ? searchResults.results.nbHits === 0 : false;
    return { query: searchState.query, noResults };
  },
})(({noResults, query}) => {
  if (isEmpty(query)) {
    body.classList.remove('searching');
    return <span></span>;
  } else if (noResults) {
    body.classList.add('searching');
    return <div>No results have been found for {query}</div>;
  } else {
    body.classList.add('searching');
    return <div className="container">
      <Hits hitComponent={Hit}/>
      <div className="d-flex">
        <Pagination
          showFirst={false}
          showLast={false}
          scrollTo={true}
        />
      </div>
    </div>;
  }
});

export default Results;
