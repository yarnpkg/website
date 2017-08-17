import React from 'react';

import Install from './Install';
import Links from './Links';
import Activity from './Activity';
import Popularity from './Popularity';
import Usage from './Usage';
import Versions from './Versions';
import Contributors from './Contributors';
import Tags from './Tags';
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
  tags,
  versions,
  devDependencies,
  onOpenFileBrowser,
}) =>
  <aside className="details-side col-lg-4">
    <article className="details-side--links">
      <Links name={name} homepage={homepage} githubRepo={githubRepo} />
    </article>
    <Install name={name} onOpenFileBrowser={onOpenFileBrowser} />
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
    <Tags tags={tags} name={name} />
    <Versions versions={versions} />
    <Contributors contributors={contributors} />
  </aside>;

export default Aside;
