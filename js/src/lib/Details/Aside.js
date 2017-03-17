import React from 'react';

import Copyable from './Copyable';
import Links from './Links';
import Activity from './Activity';
import Popularity from './Popularity';
import Usage from './Usage';
import { Owner } from '../Hit';

const Aside = (
  {
    name,
    homepage,
    githubRepo,
    contributors,
    activity,
    downloads,
    humanDownloads,
    stargazers,
    dependents,
    humanDependents,
    dependencies,
  },
) => (
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
    <Popularity
      downloads={downloads}
      humanDownloads={humanDownloads}
      stargazers={stargazers}
      dependents={dependents}
      humanDependents={humanDependents}
    />
    <Activity data={activity} />
    <Usage dependencies={dependencies} />
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
