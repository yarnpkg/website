import React, { Component } from 'react';
import { Di } from './';
import { isKnownRepositoryHost } from '../util';

const Stargazers = ({ stargazers, repository }) => {
  if (
    stargazers < 0 ||
    !repository ||
    !isKnownRepositoryHost(repository.host)
  ) {
    return null;
  }
  const [provider] = repository.host.split('.');
  return (
    <Di
      icon="stargazers"
      title={window.i18n.detail[`${provider}_stargazers`]}
      description={stargazers.toLocaleString(window.i18n.active_language)}
    />
  );
};

const Downloads = ({ downloads, humanDownloads }) =>
  downloads >= 0 &&
  humanDownloads && (
    <Di
      icon="downloads"
      title={window.i18n.detail.downloads_last_30_days}
      description={
        <span title={downloads.toLocaleString(window.i18n.active_language)}>
          {humanDownloads}
        </span>
      }
    />
  );

const Dependents = ({ dependents, humanDependents, name }) =>
  dependents >= 0 && (
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
    />
  );

const formatHits = hits => {
  if (hits >= 1e9) {
    return Math.round(hits / 1e7) / 100 + 'b';
  } else if (hits >= 1e6) {
    return Math.round(hits / 1e4) / 100 + 'm';
  } else if (hits >= 1000) {
    return Math.round(hits / 10) / 100 + 'k';
  }

  return hits;
};

const JsDelivrHits = ({ jsDelivrHits }) => (
  <Di
    icon="downloads"
    title={window.i18n.detail.jsdelivr_hits}
    description={
      <span title={jsDelivrHits.toLocaleString(window.i18n.active_language)}>
        {formatHits(jsDelivrHits)}
      </span>
    }
  />
);

export class Popularity extends Component {
  render() {
    const {
      name,
      stargazers,
      repository,
      downloads,
      humanDownloads,
      dependents,
      humanDependents,
      jsDelivrHits,
    } = this.props;

    if (
      downloads >= 0 ||
      dependents >= 0 ||
      stargazers >= 0 ||
      jsDelivrHits >= 0
    ) {
      return (
        <article className="details-side--popularity">
          <h1>{window.i18n.detail.popularity}</h1>
          <dl>
            <Stargazers repository={repository} stargazers={stargazers} />
            <Downloads downloads={downloads} humanDownloads={humanDownloads} />
            <JsDelivrHits jsDelivrHits={jsDelivrHits} />
            <Dependents
              dependents={dependents}
              humanDependents={humanDependents}
              name={name}
            />
          </dl>
        </article>
      );
    }
    return null;
  }
}
