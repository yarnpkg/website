import React from 'react';
import { createConnector } from 'react-instantsearch';
import {
  Hits,
  Pagination,
  CurrentRefinements,
  Stats,
} from 'react-instantsearch/dom';
import { connectStateResults } from 'react-instantsearch/connectors';

// import Hit from '../Hit';
import { isEmpty, noRefinements } from '../util';

const body = document.querySelector('body');

// testing
const Hit = () => <div>hello</div>;

const ResultsFound = ({ showPagination, onTagClick, onOwnerClick }) => (
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
    {/* hits causes an infinite loop? */}
    {/*<Hits
      hitComponent={({ hit }) => (
          <Hit
          onTagClick={onTagClick}
          onOwnerClick={onOwnerClick}
          hit={hit}
          key={hit.objectID}
        />
      )}
    />*/}
    <div className="d-flex">
      {showPagination ? (
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
    return { searchState, searchResults };
  },
});

const Results = connectResults(
  ({ searchState = {}, searchResults = {}, onTagClick, onOwnerClick }) => {
    console.log(searchState, noRefinements(searchState));

    // if this is false, there's an infinite loop !!
    if (noRefinements(searchState)) {
      body.classList.remove('searching');
      return <span />;
    }

    body.classList.add('searching');

    if (searchResults.results && searchResults.results.nbHits === 0) {
      const docMessage = window.i18n.no_results_docsearch.split(/[{}]+/);
      docMessage[docMessage.indexOf('documentation_link')] = (
        <a href={`${window.i18n.url_base}/docs`}>{window.i18n.documentation}</a>
      );
      return (
        <div className="container text-center mt-5">
          <p>
            {window.i18n.no_package_found.replace('{name}', searchState.query)}
          </p>
          <p>
            {docMessage.map((val, index) => <span key={index}>{val}</span>)}
          </p>
        </div>
      );
    }

    return (
      <ResultsFound
        showPagination={
          searchResults.results && searchResults.results.nbPages > 1
        }
        onTagClick={onTagClick}
        onOwnerClick={onOwnerClick}
      />
    );
  }
);

export default Results;
