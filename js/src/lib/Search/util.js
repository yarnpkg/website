import React from 'react';
import highlightTags from 'react-instantsearch/src/core/highlightTags';
import { connectToggle } from 'react-instantsearch/connectors';

export const isEmpty = (item) => typeof item === 'undefined' || item.length < 1;

export const encode = (val) => encodeURIComponent(val);

export function getDownloadBucket(dl) {
  if ( dl < 1000) {
    return null;
  } else if (dl < 5000) {
    return 'hot-t1';
  } else if (dl < 25000) {
    return 'hot-t2';
  } else if (dl < 1000000) {
    return 'hot-t3';
  } else {
    return 'hot-t4';
  }
}

const ToggleKeyword = ({createURL, refine, value, content}) => (
  <span className="ais-Hit--keyword" onClick={() => {
    refine() //value, true/false
  }}>{content}</span>
);

const ConnectedToggle = connectToggle(ToggleKeyword);

export function formatKeywords(keywords, highlightedKeywords, maxKeywords = 4) {
  if (isEmpty(keywords)) return keywords;
  highlightedKeywords.forEach((el, i) => {
    el.originalValue = keywords[i];
  })
  return highlightedKeywords.sort((k1, k2) => {
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
      return k2.matchedWords.join('').length - k1.matchedWords.join('').length;
    }
    return 0;
  }).slice(0, maxKeywords).map(_keyword => {
    const keyword = _keyword.value;
    const highlighted = parseHighlightedAttribute({highlightedValue: keyword});
    const content = highlighted.map((v, i) => {
      const key = `split-${i}-${v.value}`;
      if (!v.isHighlighted) {
        return <span key={key} className="ais-Highlight__nonHighlighted">{v.value}</span>;
      }
      return <em key={key} className="ais-Highlight__highlighted">{v.value}</em>;
    });
//      <a className="ais-Hit--keyword" href={''/*url*/}>{content}</a>
    return (
      <ConnectedToggle attributeName='keywords' value={_keyword.originalValue} label="label" content={content}/>
    )
  }).reduce((prev, curr) => [prev, ', ', curr]);
};

function parseHighlightedAttribute({
  preTag = highlightTags.highlightPreTag,
  postTag = highlightTags.highlightPostTag,
  highlightedValue,
}) {
  const splitByPreTag = highlightedValue.split(preTag);
  const firstValue = splitByPreTag.shift();
  const elements = firstValue === '' ? [] : [{value: firstValue, isHighlighted: false}];

  if (postTag === preTag) {
    let isHighlighted = true;
    splitByPreTag.forEach(split => {
      elements.push({value: split, isHighlighted});
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
