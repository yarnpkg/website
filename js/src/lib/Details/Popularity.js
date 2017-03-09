import React from 'react';

const Popularity = ({ stars, downloads, humanDownloads, dependents }) => (
  <article className="details-side--popularity">
    <h1>Popularity</h1>
    <dl>
      {stars &&
        <div>
          <dt>GitHub stargazers</dt>
          <dd>{stars}</dd>
        </div>}
      {downloads &&
        humanDownloads &&
        <div>
          <dt>Downloads in the last 30 days</dt>
          <dd title={downloads.toLocaleString()}>{humanDownloads}</dd>
        </div>}
      {dependents &&
        <div>
          <dt>Dependents</dt>
          <dd>{dependents}</dd>
        </div>}
    </dl>
  </article>
);

export default Popularity;
