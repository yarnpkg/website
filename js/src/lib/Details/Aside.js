import React from 'react';

import Copyable from './Copyable';
import Links from './Links';
import Activity from './Activity';
import Popularity from './Popularity';
import Usage from './Usage';
import Versions from './Versions';
import { Owner } from '../Hit';
import { encode, prefixURL, packageJSONLink } from '../util';

const Aside = ({
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
  versions,
  devDependencies,
  onOpenFileBrowser,
}) => (
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
        {' · '}
        <a href="#" onClick={onOpenFileBrowser}>
          {window.i18n.detail.browse_files}
        </a>
      </div>
    </article>
    <Popularity
      downloads={downloads}
      humanDownloads={humanDownloads}
      stargazers={stargazers}
      dependents={dependents}
      humanDependents={humanDependents}
      name={name}
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
    <Versions versions={versions} />
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
