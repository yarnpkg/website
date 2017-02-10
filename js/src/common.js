import React from 'react';
import ReactDOM from 'react-dom';
import { InstantSearch, Hits } from 'react-instantsearch/dom';
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
    <Hits />
  </InstantSearch>
);


ReactDOM.render(
  Search,
  document.getElementById('search')
);
