import React from 'react';
import { isEmpty, searchLink } from '../util';

export const Keywords = ({ keywords = [], maxKeywords = 4 }) => {
  return isEmpty(keywords) ? null : (
    <span className="ais-Hit-keywords hidden-sm-down">
      {keywords
        .slice(0, maxKeywords)
        .map((keyword, i) => (
          <a href={searchLink({ keyword, query: ' ' })} key={i}>
            {keyword}
          </a>
        ))
        .reduce((prev, curr, i) => [
          prev,
          <span key={i + '-separator'}>, </span>,
          curr,
        ])}
    </span>
  );
};
