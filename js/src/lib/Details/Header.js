import React from 'react';
import { License, Owner, Downloads } from '../Hit';
import { Keywords } from '../util';

const Header = (
  {
    name,
    owner,
    downloadsLast30Days,
    humanDownloadsLast30Days,
    description,
    license,
    keywords,
    version,
  },
) => (
  <header className="details-main--header">
    <h2 className="details-main--title d-inline-block m-2">
      {name}
    </h2>
    <div className="details-main--info d-inline-block m-2">
      <Owner {...owner} />
      <Downloads
        downloads={downloadsLast30Days}
        humanDownloads={humanDownloadsLast30Days}
      />
      <License type={license} />
      <span className="ais-Hit--version">{version}</span>
    </div>
    <p className="m-2">{description}</p>
    <Keywords keywords={keywords} />
  </header>
);

export default Header;
