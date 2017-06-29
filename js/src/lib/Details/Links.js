import React from 'react';

import { encode } from '../util';
import Copyable from './Copyable';

const images = {
  homepage: '/assets/search/ico-home.svg',
  npm: '/assets/search/ico-npm.svg',
  github: '/assets/search/ico-github.svg',
  yarn: '/assets/search/ico-yarn.svg',
};

export const Link = ({ site, url, display, Tag = 'a' }) =>
  <Tag
    target="_blank"
    rel="noopener noreferrer"
    href={url}
    className={`details-links--link details-links--link__${site}`}
  >
    <img src={images[site]} alt="" />
    {display}
  </Tag>;

const Links = ({ name, homepage, githubRepo, className }) =>
  <div className="detail-links">
    <Link
      site="yarn"
      display={
        <Copyable>
          <a href={`https://yarn.fyi/${name}`}>
            <span className="text-hide">
              https://
            </span>
            yarn.fyi/{name}
          </a>
        </Copyable>
      }
      Tag="div"
    />
    {homepage
      ? <Link
          site="homepage"
          url={homepage}
          display={homepage.replace(/(http)?s?(:\/\/)?(www\.)?/, '')}
        />
      : null}
    {githubRepo
      ? <Link
          site="github"
          url={`https://github.com/${encode(githubRepo.user)}/${encode(
            githubRepo.project
          )}${githubRepo.path}`}
          display={`${githubRepo.user}/${githubRepo.project}`}
        />
      : null}
    <Link
      site="npm"
      url={`https://www.npmjs.com/package/${name}`}
      display={name}
    />
  </div>;

export default Links;
