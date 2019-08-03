import React from 'react';

export const License = ({ type }) =>
  type ? <span className="ais-Hit-license">{type}</span> : null;
