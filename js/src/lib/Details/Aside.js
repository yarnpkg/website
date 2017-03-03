import React from 'react';

import Copyable from './Copyable';
import Links from './Links';
import { Owner } from '../Hit';

const Aside = ({ name, homepage, githubRepo, contributors }) => (
  <aside className="details-side col-lg-4">
    <article className="details-side--links">
      <Links name={name} homepage={homepage} githubRepo={githubRepo} />
    </article>
    <article className="details-side--copy">
      <h1>Use it</h1>
      <Copyable pre="$ " text={`yarn add ${name}`} />
      <div>
        <a
          className="details-side--runkit"
          href={`https://runkit.com/npm/${name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Try in RunKit
        </a>
      </div>
    </article>
    <article className="details-side--popularity">
      <h1>Popularity</h1>
    </article>
    <article className="details-side--activity">
      <h1>Activity</h1>
    </article>
    <article className="details-side--contributors">
      <h1>Contributors</h1>
      <ul className="list-unstyled m-2">
        {contributors.map(contributor => (
          <li className="mb-1" key={contributor.name}>
            <Owner {...contributor} />
          </li>
        ))}
      </ul>
    </article>
  </aside>
);

export default Aside;
