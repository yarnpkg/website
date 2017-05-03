import React from 'react';
import createConnector from 'react-instantsearch/src/core/createConnector';
import Hits from 'react-instantsearch/src/widgets/InfiniteHits';
import CurrentRefinements
  from 'react-instantsearch/src/widgets/CurrentRefinements';

import Hit from '../Hit';
import { isEmpty } from '../util';

const body = document.querySelector('body');

const ResultsFound = () => (
  <div className="container">
    <CurrentRefinements />
    <Hits hitComponent={Hit} />
    <div className="search-footer">
      {window.i18n.search_by_algolia}
      {' - '}
      <a href="https://discourse.algolia.com/t/2016-algolia-community-gift-yarn-package-search/319">
        {window.i18n.search_by_read_more}
      </a>
      .
    </div>
  </div>
);

const Results = createConnector({
  displayName: 'ConditionalResults',
  getProvidedProps(props, searchState, searchResults) {
    const noResults = searchResults.results
      ? searchResults.results.nbHits === 0
      : false;
    return { query: searchState.query, noResults };
  },
})(({ noResults, query }) => {
  if (isEmpty(query)) {
    body.classList.remove('searching');
    return <span />;
  } else if (noResults) {
    body.classList.add('searching');
    const docMessage = window.i18n.no_results_docsearch.split(/[{}]+/);
    docMessage[docMessage.indexOf('documentation_link')] = (
      <a href={`${window.i18n.url_base}/docs`}>{window.i18n.documentation}</a>
    );

    return (
      <div className="container text-center mt-5">
        <p>{window.i18n.no_package_found.replace('{name}', query)}</p>
        <p>{docMessage.map((val, index) => <span key={index}>{val}</span>)}</p>
      </div>
    );
  } else {
    body.classList.add('searching');
    return <ResultsFound />;
  }
});

export default Results;
