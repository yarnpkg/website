import React from 'react';
import { Di } from './';

const Popularity = ({
  name,
  stargazers,
  downloads,
  humanDownloads,
  dependents,
  humanDependents,
}) => (
  <article className="details-side--popularity">
    <h1>{window.i18n.detail.popularity}</h1>
    <dl>
      {stargazers > 0 &&
        <Di
          icon="stargazers"
          title={window.i18n.detail.github_stargazers}
          description={stargazers.toLocaleString(window.i18n.active_language)}
        />}
      {downloads > 0 &&
        humanDownloads &&
        <Di
          icon="downloads"
          title={window.i18n.detail.downloads_last_30_days}
          description={
            <span title={downloads.toLocaleString(window.i18n.active_language)}>
              {humanDownloads}
            </span>
          }
        />}
      {dependents > 0 &&
        <Di
          icon="dependents"
          title={window.i18n.detail.dependents}
          description={
            <a
              href={`https://www.npmjs.com/browse/depended/${name}`}
              target="_blank"
              rel="noopener noreferrer"
              title={dependents.toLocaleString(window.i18n.active_language)}
            >
              {humanDependents}
            </a>
          }
        />}
    </dl>
  </article>
);

export default Popularity;
