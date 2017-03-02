import React from 'react';
import ReactDOM from 'react-dom';
import Details from './lib/Details';

const id = process.env.NODE_ENV == 'production'
  ? location.pathname.split('/')[3]
  : location.search.substring(1);

ReactDOM.render(
  <Details objectID={id} />,
  document.getElementById('pkg-detail'),
);
