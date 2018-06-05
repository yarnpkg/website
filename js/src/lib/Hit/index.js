import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { Highlight } from 'react-instantsearch-dom';
import {
  getDownloadBucket,
  formatKeywords,
  encode,
  packageLink,
  isEmpty,
  HighlightedMarkdown,
  i18nReplaceVars,
  isKnownRepositoryHost,
} from '../util';

export const License = ({ type }) =>
  type ? <span className="ais-Hit-license">{type}</span> : null;

export const Deprecated = ({ deprecated }) =>
  deprecated ? (
    <span className="ais-Hit-deprecated" title={deprecated}>
      {window.i18n.deprecated}
    </span>
  ) : null;

export const Owner = ({ link, avatar, name, onClick }) => (
  <a
    className="ais-Hit-ownerLink"
    href={link}
    onClick={e => {
      if (onClick && !(e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClick(name);
      }
    }}
  >
    <img
      width="20"
      height="20"
      className="ais-Hit-ownerAvatar"
      src={`https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/${avatar}`}
    />
    {name}
  </a>
);

export const Downloads = ({ downloads = 0, humanDownloads }) => (
  <span
    className={`ais-Hit-popular ${getDownloadBucket(downloads)}`}
    title={window.i18n.downloads_in_last_30_days.replace(
      '{count}',
      downloads.toLocaleString(window.i18n.active_language)
    )}
  >
    {humanDownloads}
  </span>
);

const Repository = ({ repository, name }) => {
  const [provider] = repository.host.split('.');

  return (
    <span className={`ais-Hit-link-${provider}`}>
      <a
        title={i18nReplaceVars(window.i18n.repository_of, {
          provider: window.i18n[provider] || provider,
          name,
        })}
        href={`https://${repository.host}/${encode(repository.user)}/${encode(
          repository.project
        )}${repository.path || ''}`}
      >
        {window.i18n[provider]}
      </a>
    </span>
  );
};

export const Links = ({ name, homepage, repository, className }) => (
  <div className={className}>
    <span className="ais-Hit-link-npm">
      <a
        href={`https://www.npmjs.com/package/${name}`}
        title={window.i18n.npm_page_for.replace('{name}', name)}
      >
        {window.i18n.npm}
      </a>
    </span>
    {repository && isKnownRepositoryHost(repository.host) ? (
      <Repository name={name} repository={repository} />
    ) : null}
    {homepage ? (
      <span className="ais-Hit-link-homepage">
        <a title={`Homepage of ${name}`} href={homepage}>
          {window.i18n.homepage}
        </a>
      </span>
    ) : null}
  </div>
);

const Hit = ({ hit, onTagClick, onOwnerClick }) => (
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

export default Hit;
