import React from 'react';
import {
  License,
  Deprecated,
  Owner,
  Downloads,
  TypeScript,
  Keywords,
} from './';
import { safeMarkdown } from '../util';

const Description = ({ description, deprecated }) => (
  <div>
    {deprecated ? (
      <p className="m-2">
        <strong dangerouslySetInnerHTML={safeMarkdown(deprecated)} />
      </p>
    ) : null}
    <p
      className="m-2 lead"
      dangerouslySetInnerHTML={safeMarkdown(description)}
    />
  </div>
);

export const Header = ({
  name,
  owner,
  downloadsLast30Days,
  humanDownloadsLast30Days,
  description,
  license,
  deprecated,
  keywords = [],
  version,
  types,
}) => (
  <header className="details-main--header">
    <h2 className="details-main--title d-inline-block m-2">{name}</h2>
    <div className="details-main--info d-inline-block m-2">
      <Owner {...owner} />
      <Downloads
        downloads={downloadsLast30Days}
        humanDownloads={humanDownloadsLast30Days}
      />
      <License type={license} />
      <Deprecated deprecated={deprecated} />
      <span className="ais-Hit-version">{version}</span>
      <TypeScript ts={types.ts} />
    </div>
    <Description description={description} deprecated={deprecated} />
    <Keywords keywords={keywords} maxKeywords={keywords.length} />
  </header>
);
