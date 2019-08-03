import React from 'react';
import ReactDOM from 'react-dom';
import { Details } from './components';
import qs from 'qs';

/*
  To get the package id:
    - production: https://yarnpkg.com/en/package/@kadira/storybook => @kadira/storybook
    - dev (no rewrite available): http://localhost:4000/lang/en/package/?@kadira/storybook => @kadira/storybook
*/
const search = qs.parse(location.search, { ignoreQueryPrefix: true });
const id =
  process.env.NODE_ENV == 'production'
    ? location.pathname
        .split('/')
        .slice(3)
        .join('/')
    : // Get the first search param. It is necessary because it can have more than one
      // param, e.g: when using ?files (to open the file browser).
      Object.keys(search)[0];

function languageDropdownAddPackage(pkg) {
  const langMenu = document.getElementById('dropdownNavLanguageMenu');
  const langMenuItems = langMenu.querySelectorAll('.dropdown-item');

  const addPackage = langMenuItem => (langMenuItem.href += `/${pkg}`);

  for (let i = 0; i < langMenuItems.length; i++) {
    addPackage(langMenuItems[i]);
  }
}

languageDropdownAddPackage(id);

ReactDOM.render(
  <Details objectID={id} />,
  document.getElementById('pkg-detail')
);
