import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  InstantSearch,
  Configure,
  connectHits,
  connectRefinementList,
} from 'react-instantsearch-dom';
import { Owner, Keywords } from './components';
import { packageLink } from './util';
import { algolia } from './util/config';

const FEATURED = ['babel-core', 'react', 'async', 'lodash', 'debug', 'qs'];

const FeaturedPackage = ({ name, owner, description, keywords }) => (
  <div className="pkg-featured-pkg">
    <Owner name={owner.name} link={owner.link} avatar={owner.avatar} />
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
    name: PropTypes.string.isRequired,
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
          {packages.map(({ name, description, owner, keywords, objectID }) => (
            <FeaturedPackage
              name={name}
              description={description}
              owner={owner}
              keywords={keywords}
              objectID={objectID}
              key={objectID}
            />
          ))}
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
      analytics={false}
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
