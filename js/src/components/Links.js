import React from 'react';
import { isKnownRepositoryHost, i18nReplaceVars, encode } from '../util';

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
