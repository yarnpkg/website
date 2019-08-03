import React from 'react';
import {
  Pagination,
  CurrentRefinements,
  Stats,
  connectHits,
  createConnector,
} from 'react-instantsearch-dom';

import { Hit } from './';
import { isEmpty } from '../util';

const body = document.querySelector('body');

const Hits = connectHits(({ hits, onTagClick, onOwnerClick }) =>
  hits.map(hit => (
    <Hit
      onTagClick={onTagClick}
      onOwnerClick={onOwnerClick}
      hit={hit}
      key={hit.objectID}
    />
  ))
);

const ResultsFound = ({ pagination, onTagClick, onOwnerClick }) => (
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
    <Hits onTagClick={onTagClick} onOwnerClick={onOwnerClick} />
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

const connectResults = createConnector({
  displayName: 'ConnectResults',
  getProvidedProps(props, searchState, searchResults) {
    const pagination = searchResults.results
      ? searchResults.results.nbPages > 1
      : false;
    const noResults = searchResults.results
      ? searchResults.results.nbHits === 0
      : false;
    return { query: searchState.query, noResults, pagination };
  },
});

export const Results = connectResults(
  ({ noResults, query, pagination, onTagClick, onOwnerClick }) => {
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
          <p>
            {docMessage.map((val, index) => <span key={index}>{val}</span>)}
          </p>
        </div>
      );
    } else {
      body.classList.add('searching');
      return (
        <ResultsFound
          pagination={pagination}
          onTagClick={onTagClick}
          onOwnerClick={onOwnerClick}
        />
      );
    }
  }
);
