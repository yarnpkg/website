import React from 'react';

const Popularity = (
  { stargazers, downloads, humanDownloads, dependents, humanDependents },
) => (
  <article className="details-side--popularity">
    <h1>{window.i18n.detail.popularity}</h1>
    <dl>
      {stargazers &&
        <div className="d-flex flex-items-between w-100">
          <img src="/assets/detail/ico-stargazers.svg" alt="" />
          <dt>{window.i18n.detail.github_stargazers}</dt>
          <span className="dotted flex-grow" />
          <dd>{stargazers.toLocaleString()}</dd>
        </div>}
      {downloads &&
        humanDownloads &&
        <div className="d-flex flex-items-between w-100">
          <img src="/assets/detail/ico-downloads.svg" alt="" />
          <dt>{window.i18n.detail.downloads_last_30_days}</dt>
          <span className="dotted flex-grow" />
          <dd title={downloads.toLocaleString()}>
            {humanDownloads}
          </dd>
        </div>}
      {dependents &&
        <div className="d-flex flex-items-between w-100">
          <img src="/assets/detail/ico-dependents.svg" alt="" />
          <dt>{window.i18n.detail.dependents}</dt>
          <span className="dotted flex-grow" />
          <dd title={dependents.toLocaleString()}>{humanDependents}</dd>
        </div>}
    </dl>
  </article>
);

export default Popularity;
