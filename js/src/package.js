import React from 'react';
import ReactDOM from 'react-dom';
import Details from './lib/Details';

/*
  To get the package id:
    - production: https://yarnpkg.com/en/package/@kadira/storybook => @kadira/storybook
    - dev (no rewrite available): http://localhost:4000/lang/en/package/?@kadira/storybook => @kadira/storybook
*/
const id = process.env.NODE_ENV == 'production'
  ? location.pathname.split('/').slice(3).join('/')
  : location.search.substring(1);

ReactDOM.render(
  <Details objectID={id} />,
  document.getElementById('pkg-detail'),
);
