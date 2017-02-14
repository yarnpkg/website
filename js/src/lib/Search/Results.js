import React from 'react';
import { createConnector } from 'react-instantsearch';
import { Hits, Pagination } from 'react-instantsearch/dom';
import Hit from './Hit';
import { isEmpty } from './util';

const Results = createConnector({
  displayName: 'ConditionalResults',
  getProvidedProps(props, searchState, searchResults) {
    const noResults = searchResults.results ? searchResults.results.nbHits === 0 : false;
    return { query: searchState.query, noResults };
  },
})(({noResults, query}) => {
  if (isEmpty(query)) {
    return <span></span>;
  } else if (noResults) {
    return <div>No results have been found for {query}</div>;
  } else {
    return <div className="container">
      <Hits hitComponent={Hit}/>
      <Pagination
        showFirst={false}
        showLast={false}
        scrollTo={true}
      />
    </div>;
  }
});

export default Results;
