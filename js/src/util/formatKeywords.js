import React from 'react';
import { HIGHLIGHT_TAGS } from 'react-instantsearch-dom';
import { isEmpty } from './';

export function formatKeywords(
  keywords = [],
  highlightedKeywords = [],
  maxKeywords = 4,
  onClick
) {
  if (isEmpty(keywords)) return keywords;
  highlightedKeywords.forEach((el, i) => {
    el.originalValue = keywords[i];
  });
  return highlightedKeywords
    .sort((k1, k2) => {
      // sort keywords by match level
      if (k1.matchLevel !== k2.matchLevel) {
        if (k1.matchLevel === 'full') return -1;
        if (k2.matchLevel === 'full') return 1;
        return k1.matchLevel === 'partial' ? -1 : 1;
      }
      if (k1.matchedWords.length !== k2.matchedWords.length) {
        return k2.matchedWords.length - k1.matchedWords.length;
      }
      if (k1.matchedWords.join('').length !== k2.matchedWords.join('').length) {
        return (
          k2.matchedWords.join('').length - k1.matchedWords.join('').length
        );
      }
      return 0;
    })
    .slice(0, maxKeywords)
    .map(
      ({ value: highlightedKeyword, originalValue: keyword }, keywordIndex) => {
        const highlighted = parseHighlightedAttribute({
          highlightedValue: highlightedKeyword,
        });
        const content = highlighted.map((v, i) => {
          const key = `split-${i}-${v.value}`;
          if (v.isHighlighted) {
            return (
              <em key={key} className="ais-Highlight-highlighted">
                {v.value}
              </em>
            );
          }
          return (
            <span key={key} className="ais-Highlight-nonHighlighted">
              {v.value}
            </span>
          );
        });
        return (
          <span
            className="ais-Hit-keyword"
            key={`${keyword}${keywordIndex}`}
            onClick={() => onClick(keyword)}
          >
            {content}
          </span>
        );
      }
    )
    .reduce((prev, curr) => [prev, ', ', curr]);
}

function parseHighlightedAttribute({
  preTag = HIGHLIGHT_TAGS.highlightPreTag,
  postTag = HIGHLIGHT_TAGS.highlightPostTag,
  highlightedValue,
}) {
  const splitByPreTag = highlightedValue.split(preTag);
  const firstValue = splitByPreTag.shift();
  const elements =
    firstValue === '' ? [] : [{ value: firstValue, isHighlighted: false }];

  if (postTag === preTag) {
    let isHighlighted = true;
    splitByPreTag.forEach(split => {
      elements.push({ value: split, isHighlighted });
      isHighlighted = !isHighlighted;
    });
  } else {
    splitByPreTag.forEach(split => {
      const splitByPostTag = split.split(postTag);
      elements.push({
        value: splitByPostTag[0],
        isHighlighted: true,
      });

      if (splitByPostTag[1] !== '') {
        elements.push({
          value: splitByPostTag[1],
          isHighlighted: false,
        });
      }
    });
  }

  return elements;
}
