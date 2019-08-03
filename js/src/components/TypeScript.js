import React from 'react';

export const TypeScript = ({ ts = false }) => {
  return ts !== false ? (
    <img
      className="ais-Hit-typescript"
      src="/assets/search/ico-typescript.svg"
      alt={`TypeScript support: ${ts}`}
      title={`TypeScript support: ${ts}`}
    />
  ) : null;
};
