import React from 'react';

import Copyable from './Copyable';
import Links from './Links';
import Activity from './Activity';
import Popularity from './Popularity';
import Usage from './Usage';
import { Owner } from '../Hit';
import { encode, prefixURL, packageJSONLink } from '../util';

const Aside = (
  {
    name,
    homepage,
    githubRepo,
    gitHead,
    contributors,
    activity,
    downloads,
    humanDownloads,
    stargazers,
    dependents,
    humanDependents,
    dependencies,
    devDependencies,
  }
) => (
  <aside className="details-side col-lg-4">
    <article className="details-side--links">
      <Links name={name} homepage={homepage} githubRepo={githubRepo} />
    </article>
    <article className="details-side--copy">
      <h1>{window.i18n.detail.use_it}</h1>
      <Copyable pre="$ " text={`yarn add ${name}`} />
      <div>
        <a
          className="details-side--runkit"
          href={`https://runkit.com/npm/${name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {window.i18n.detail.try_in_runkit}
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
    {githubRepo &&
      githubRepo.user &&
      githubRepo.project &&
      <Activity data={activity} githubRepo={githubRepo} />}
    <Usage
      dependencies={dependencies}
      devDependencies={devDependencies}
      {...packageJSONLink({ githubRepo, gitHead })}
    />
    <article className="details-side--contributors">
      <h1>{window.i18n.detail.contributors}</h1>
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
