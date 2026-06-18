import React from 'react';

export const Deprecated = ({ deprecated }) =>
  deprecated ? (
    <span className="ais-Hit-deprecated" title={deprecated.toString()}>
      {window.i18n.deprecated}
    </span>
  ) : null;
