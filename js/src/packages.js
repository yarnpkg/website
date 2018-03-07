import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, Configure } from 'react-instantsearch/es/dom';
import {
  connectHits,
  connectRefinementList,
} from 'react-instantsearch/es/connectors';
import { Owner } from './lib/Hit';
import { packageLink, Keywords } from './lib/util';
import { algolia } from './lib/config';

const FEATURED = ['babel-core', 'react', 'async', 'lodash', 'debug', 'qs'];

const FeaturedPackage = ({ name, owner, description, keywords }) => (
  <div className="pkg-featured-pkg">
    <Owner {...owner} />
    <a className="ais-Hit-name" href={packageLink(name)}>
      {name}
    </a>
    <p>{description}</p>
    <Keywords keywords={keywords} />
  </div>
);

FeaturedPackage.propTypes = {
  name: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    link: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const FilterByIds = connectRefinementList(() => null);

const Hits = connectHits(({ hits }) => {
  const half = Math.floor(hits.length / 2);
  const groups = [hits.slice(0, half), hits.slice(half, hits.length)];
  return (
    <div className="row">
      {groups.map((packages, i) => (
        <div className="col-md-6" key={i}>
          {packages.map(pkg => <FeaturedPackage {...pkg} key={pkg.objectID} />)}
        </div>
      ))}
    </div>
  );
});

const Featured = ({ objectIDs }) => (
  <InstantSearch
    appId={algolia.appId}
    apiKey={algolia.apiKey}
    indexName={algolia.indexName}
  >
    <Configure
      hitsPerPage={6}
      attributesToRetrieve={['name', 'owner', 'description', 'keywords']}
      attributesToHighlight={[]}
    />
    <FilterByIds attribute="objectID" defaultRefinement={objectIDs} />
    <Hits />
  </InstantSearch>
);

ReactDOM.render(
  <Featured objectIDs={FEATURED} />,
  document.getElementById('pkg-featured')
);
