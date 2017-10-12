import React from 'react';
import { createConnector } from 'react-instantsearch';
import { connectStateResults } from 'react-instantsearch/connectors';
import {
  Hits,
  Pagination,
  CurrentRefinements,
  Stats,
} from 'react-instantsearch/dom';

import Hit from '../Hit';
import { isEmpty } from '../util';

const body = document.querySelector('body');

const ResultsFound = ({ pagination, onTagClick }) => (
  <div className="container">
    <div className="mx-3">
      <CurrentRefinements />
      <Stats
        translations={{
          stats: (num, time) =>
            window.i18n.result_stats
              .replace(
                '{number_packages}',
                num.toLocaleString(window.i18n.active_language)
              )
              .replace('{time_search}', time),
        }}
      />
    </div>
    <Hits
      hitComponent={({ hit }) => (
        <Hit onTagClick={onTagClick} hit={hit} key={hit.objectID} />
      )}
    />
    <div className="d-flex">
      {pagination ? (
        <Pagination showFirst={false} showLast={false} scrollTo={true} />
      ) : (
        <div style={{ height: '3rem' }} />
      )}
    </div>
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

const Results = connectStateResults(
  ({ searchState, searchResults, onTagClick }) => {
    if ((searchState && isEmpty(searchState.query)) || !searchState) {
      body.classList.remove('searching');
      return <span />;
    } else if (searchResults && searchResults.nbHits === 0) {
      body.classList.add('searching');
      const docMessage = window.i18n.no_results_docsearch.split(/[{}]+/);
      docMessage[docMessage.indexOf('documentation_link')] = (
        <a href={`${window.i18n.url_base}/docs`}>{window.i18n.documentation}</a>
      );

      return (
        <div className="container text-center mt-5">
          <p>{window.i18n.no_package_found.replace('{name}', query)}</p>
          <p>
            {docMessage.map((val, index) => <span key={index}>{val}</span>)}
          </p>
        </div>
      );
    } else {
      body.classList.add('searching');
      return (
        <ResultsFound
          pagination={searchResults && searchResults.nbPages > 1}
          onTagClick={onTagClick}
        />
      );
    }
  }
);

export default Results;
