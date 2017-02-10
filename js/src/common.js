import React from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, Hits, SearchBox, Pagination } from 'react-instantsearch/dom';
import { fillLanguageDropdown } from './lib/production';

if (process.env.NODE_ENV === 'production') {
  fillLanguageDropdown();
}

const Search = () => (
  <InstantSearch
    appId='OFCNCOG2CU'
    apiKey='f54e21fa3a2a0160595bb058179bfb1e'
    indexName='npm-search'
  >
    <SearchBox />
    <Hits hitComponent={Result} id="pkg-search-hits"/>
    <Pagination/>
  </InstantSearch>
);

const Result = ({hit}) => {
  console.log(hit);
  return <div class="ais-hits--item">
    <a class="ais-hit--name" href={`/packages/${hit.name}`}>{hit.name}</a>
    <span class="ais-hit--popular" title="Downloads last 30 days">{hit.downloadsLast30Days}</span> <span class="ais-hit--license">{hit.license}</span> <span class="ais-hit--version">{hit.version}</span>
    <p class="ais-hit--description">{hit.description}</p>
    <a class="ais-hit--ownerLink" href={hit.owner}><img width="20" height="20" class="ais-hit--ownerAvatar" src={`https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/${hit.owner.avatar}`} />{hit.owner.name}</a>
    <span class="ais-hit--lastUpdate">4 days ago</span> <span class="ais-hit--keywords hidden-sm-down"><a class="ais-hit--keyword" href="https://yarnpkg.com/search/?q=erst&amp;p=0&amp;fR[keywords][0]=erste"><em>erst</em>e</a>, <a class="ais-hit--keyword" href="https://yarnpkg.com/search/?q=erst&amp;p=0&amp;fR[keywords][0]=bank">bank</a></span>
    <div class="ais-hit--links"><span class="ais-hit--link-npm"><a href="https://www.npmjs.com/package/erste-bank-client" title={`NPM page for ${hit.name}`}>npm</a></span><span class="ais-hit--link-github"><a title={`Github repository of ${hit.name}`} href={`https://github.com/${encode(hit.githubRepo.user)}/${encode(hit.githubRepo.project)}${hit.githubRepo.path}`}>GitHub</a></span></div>
  </div>;
}

ReactDOM.render(
  <Search />,
  document.getElementById('search')
);
