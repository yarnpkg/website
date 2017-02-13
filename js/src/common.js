import React from 'react';
import ReactDOM from 'react-dom';
import { fillLanguageDropdown } from './lib/production';
import Search from './lib/Search';

if (process.env.NODE_ENV === 'production') {
  fillLanguageDropdown();
}

ReactDOM.render(
  <Search />,
  document.getElementById('search')
);
