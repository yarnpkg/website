import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { Highlight } from 'react-instantsearch-dom';
import { formatKeywords, packageLink, isEmpty } from '../util';
import {
  Downloads,
  HighlightedMarkdown,
  License,
  Deprecated,
  TypeScript,
  Owner,
  Links,
} from './';

export const Hit = ({ hit, onTagClick, onOwnerClick }) => (
  <div className="ais-Hits-item">
    <a className="ais-Hit-name" href={packageLink(hit.name)}>
      <Highlight attribute="name" hit={hit} />
    </a>
    <Downloads
      downloads={hit.downloadsLast30Days}
      humanDownloads={hit.humanDownloadsLast30Days}
    />
    <License type={hit.license} />
    <Deprecated deprecated={hit.deprecated} />
    <span className="ais-Hit-version">{hit.version}</span>
    <TypeScript ts={hit.types.ts} />
    <p className="ais-Hit-description">
      {hit.deprecated ? (
        hit.deprecated
      ) : (
        <HighlightedMarkdown attribute="description" hit={hit} />
      )}
    </p>
    <Owner {...hit.owner} onClick={onOwnerClick} />
    <span
      className="ais-Hit-lastUpdate"
      title={window.i18n.last_updated.replace(
        '{update_date}',
        new Date(hit.modified).toLocaleDateString(window.i18n.active_language)
      )}
    >
      {window.i18n.time_ago.replace(
        '{time_distance}',
        formatDistance(new Date(hit.modified), new Date())
      )}
    </span>
    {isEmpty(hit.keywords) ? null : (
      <span className="ais-Hit-keywords hidden-sm-down">
        {formatKeywords(
          hit.keywords,
          hit._highlightResult.keywords,
          4,
          onTagClick
        )}
      </span>
    )}
    <Links
      className="ais-Hit-links"
      name={hit.name}
      homepage={hit.homepage}
      repository={hit.repository}
    />
  </div>
);
