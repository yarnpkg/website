import React from 'react';

const Popularity = ({ stars, downloads, humanDownloads, dependents }) => (
  <article className="details-side--popularity">
    <h1>Popularity</h1>
    <dl>
      {stars &&
        <div className="d-flex flex-items-between w-100">
          <dt>GitHub stargazers</dt>
          <dd>{stars}</dd>
        </div>}
      {downloads &&
        humanDownloads &&
        <div className="d-flex flex-items-between w-100">
          <dt>Downloads in the last 30 days</dt>
          <dd title={downloads.toLocaleString()}>
            {humanDownloads}
          </dd>
        </div>}
      {dependents &&
        <div className="d-flex flex-items-between w-100">
          <dt>Dependents</dt>
          <dd>{dependents}</dd>
        </div>}
    </dl>
  </article>
);

export default Popularity;
