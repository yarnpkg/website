import React from 'react';
import { connectHighlight } from 'react-instantsearch-dom';
import { safeMarkdown } from '../util';

export const HighlightedMarkdown = connectHighlight(
  ({ highlight, attribute, hit }) => (
    <span className="ais-Hit-keyword">
      {highlight({
        attribute,
        hit,
        highlightProperty: '_highlightResult',
      }).map(
        (v, i) =>
          v.isHighlighted ? (
            <em
              key={`split-${i}-${v.value}`}
              className="ais-Highlight-highlighted"
              dangerouslySetInnerHTML={safeMarkdown(v.value)}
            />
          ) : (
            <span
              key={`split-${i}-${v.value}`}
              className="ais-Highlight-nonHighlighted"
              dangerouslySetInnerHTML={safeMarkdown(v.value)}
            />
          )
      )}
    </span>
  )
);
