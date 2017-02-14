import React from 'react';
import moment from 'moment';
import { Highlight } from 'react-instantsearch/dom';

import { getDownloadBucket, formatKeywords, encode } from './util';

const Hit = ({hit}) => (
  <div className="ais-Hits--item">
    <a className="ais-Hit--name" href={`/packages/${hit.name}`}>
      <Highlight attributeName="name" hit={hit}/>
    </a>
    <span className={`ais-Hit--popular ${getDownloadBucket(hit.downloadsLast30Days)}`} title="Downloads last 30 days">{hit.humanDownloadsLast30Days}</span>
    {
      hit.license ?
        <span className="ais-Hit--license">{hit.license}</span>
        : ''
    }
    <span className="ais-Hit--version">{hit.version}</span>
    <p className="ais-Hit--description">
      <Highlight attributeName="description" hit={hit} />
    </p>
    <a className="ais-Hit--ownerLink" href={hit.owner.link}>
      <img width="20" height="20" className="ais-Hit--ownerAvatar" src={`https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/${hit.owner.avatar}`} />{hit.owner.name}
    </a>
    <span className="ais-Hit--lastUpdate">{moment(hit.modified).fromNow()}</span>
    <span className="ais-Hit--keywords hidden-sm-down">
      {formatKeywords(hit.keywords, hit._highlightResult.keywords)}
    </span>
    <div className="ais-Hit--links">
      <span className="ais-Hit--link-npm">
        <a href={`https://www.npmjs.com/package/${hit.name}`} title={`NPM page for ${hit.name}`}>npm</a>
      </span>
      {
        hit.githubRepo ? 
          <span className="ais-Hit--link-github">
            <a title={`Github repository of ${hit.name}`} href={`https://github.com/${encode(hit.githubRepo.user)}/${encode(hit.githubRepo.project)}${hit.githubRepo.path}`}>GitHub</a>
          </span>
          : ''
      }
    </div>
  </div>
);

export default Hit;