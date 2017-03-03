import React from 'react';
import { License, Owner, Downloads } from '../Hit';
import { Keywords } from '../util';

const Header = (
  {
    name,
    owner,
    downloadsLast30Days,
    humanDownloadsLast30Days,
    license,
    keywords,
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
      <Keywords keywords={keywords} />
    </div>
  </header>
);

export default Header;
