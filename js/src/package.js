import React from 'react';
import ReactDOM from 'react-dom';
import Details from './lib/Details';

/*
  To get the package id:
    - production: https://yarnpkg.com/en/package/@kadira/storybook => @kadira/storybook
    - dev (no rewrite available): http://localhost:4000/lang/en/package/?@kadira/storybook => @kadira/storybook
*/
const id =
  process.env.NODE_ENV == 'production'
    ? location.pathname
        .split('/')
        .slice(3)
        .join('/')
    : location.search.substring(1);

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
