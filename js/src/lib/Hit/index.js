import React from 'react';
<<<<<<< HEAD
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import Highlight from 'react-instantsearch/src/widgets/Highlight';
import { getDownloadBucket, formatKeywords, encode, isEmpty } from './util';
=======
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { Highlight } from 'react-instantsearch/dom';
>>>>>>> switch out moment for date-fns

const packageLink = '/package' +
  (process.env.NODE_ENV === 'production' ? '/' : '?');

const Hit = ({ hit }) => (
  <div className="ais-Hits--item">
    <a className="ais-Hit--name" href={packageLink + hit.name}>
      <Highlight attributeName="name" hit={hit} />
    </a>
    <span
      className={
        `ais-Hit--popular ${getDownloadBucket(hit.downloadsLast30Days)}`
      }
      title="Downloads last 30 days"
    >
      {hit.humanDownloadsLast30Days}
    </span>
    {hit.license
      ? <span className="ais-Hit--license">{hit.license}</span>
      : null}
    <span className="ais-Hit--version">{hit.version}</span>
    <p className="ais-Hit--description">
      <Highlight attributeName="description" hit={hit} />
    </p>
    <a className="ais-Hit--ownerLink" href={hit.owner.link}>
      <img
        width="20"
        height="20"
        className="ais-Hit--ownerAvatar"
        src={
          `https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/${hit.owner.avatar}`
        }
      />
      {hit.owner.name}
    </a>
<<<<<<< HEAD
    <span className="ais-Hit--lastUpdate">
      {distanceInWordsToNow(new Date(hit.modified))}
=======
    <span className="ais-Hit--lastUpdate">{distanceInWordsToNow(new Date(hit.modified))}</span>
    <span className="ais-Hit--keywords hidden-sm-down">
      {formatKeywords(hit.keywords, hit._highlightResult.keywords)}
>>>>>>> switch out moment for date-fns
    </span>

    {isEmpty(hit.keywords)
      ? null
      : <span className="ais-Hit--keywords hidden-sm-down">
          {formatKeywords(hit.keywords, hit._highlightResult.keywords)}
        </span>}
    <div className="ais-Hit--links">
      <span className="ais-Hit--link-npm">
        <a
          href={`https://www.npmjs.com/package/${hit.name}`}
          title={`NPM page for ${hit.name}`}
        >
          npm
        </a>
      </span>
      {hit.githubRepo
        ? <span className="ais-Hit--link-github">
            <a
              title={`Github repository of ${hit.name}`}
              href={
                `https://github.com/${encode(hit.githubRepo.user)}/${encode(
                  hit.githubRepo.project,
                )}${hit.githubRepo.path}`
              }
            >
              GitHub
            </a>
          </span>
        : null}
      {hit.homepage
        ? <span className="ais-Hit--link-homepage">
            <a title={`Homepage of ${hit.name}`} href={hit.homepage}>
              Homepage
            </a>
          </span>
        : null}
    </div>
  </div>
);

export default Hit;
