import React from 'react';
import fetch from 'unfetch';
import marked from 'marked';
import xss from 'xss';
import unescape from 'unescape-html';
import qs from 'qs';
import highlightTags from 'react-instantsearch/src/core/highlightTags';
import {
  connectToggle,
  connectHighlight,
} from 'react-instantsearch/connectors';

export const isEmpty = item => typeof item === 'undefined' || item.length < 1;

export const encode = val => encodeURIComponent(val);

export function getDownloadBucket(dl) {
  if (dl < 1000) {
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

export const Keywords = ({ keywords = [], maxKeywords = 4 }) => {
  return isEmpty(keywords) ? null : (
    <span className="ais-Hit--keywords hidden-sm-down">
      {keywords
        .slice(0, maxKeywords)
        .map(keyword => (
          <a
            href={searchLink({ q: ' ', keywords: [keyword] })}
            key={`${name}-${keyword}`}
          >
            {keyword}
          </a>
        ))
        .reduce((prev, curr) => [prev, ', ', curr])}
    </span>
  );
};

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
              <em key={key} className="ais-Highlight__highlighted">
                {v.value}
              </em>
            );
          }
          return (
            <span key={key} className="ais-Highlight__nonHighlighted">
              {v.value}
            </span>
          );
        });
        return (
          <span
            className="ais-Hit--keyword"
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
  preTag = highlightTags.highlightPreTag,
  postTag = highlightTags.highlightPostTag,
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

export function packageJSONLink({ githubRepo }) {
  if (githubRepo) {
    const { user, project, path, head } = githubRepo;

    return {
      packageJSONLink: prefixURL('package.json', {
        base: 'https://github.com',
        user,
        project,
        head: head ? `tree/${head}` : 'tree/master',
        path,
      }),
    };
  }
  return {};
}

export const packageLink = name =>
  `${window.i18n.url_base}/package${process.env.NODE_ENV === 'production'
    ? '/'
    : '?'}${name}`;

export const searchLink = ({ q, p, keywords, owner }) =>
  `${window.i18n.url_base}/packages?${qs.stringify({ q, keywords, p, owner })}`;

export const prefixURL = (url, { base, user, project, head, path }) => {
  if (url.indexOf('//') > 0) {
    return url;
  } else {
    return new URL(
      (path ? path.replace(/^\//, '') + '/' : '') +
        url.replace(/^(\.?\/?)/, ''),
      `${base}/${user}/${project}/${path ? '' : `${head}/`}`
    );
  }
};

const status = res =>
  new Promise((resolve, reject) => {
    if (res.status >= 200 && res.status < 300) {
      // GitHub will return status 202 or 204 if things like contributor activity are
      // valid, but not yet computed, and will return an empty response
      if (res.status === 202 || res.status === 204) {
        reject(res);
      }
      resolve(res);
    } else {
      reject(res);
    }
  });

export const get = ({ url, type }) =>
  fetch(url)
    .then(status)
    .then(res => res[type]())
    .catch(err => {
      // in case it's a useless response by GitHub, tell the caller to retry
      if (err.status === 202 || err.status === 204) {
        throw 'retry';
      } else {
        console.warn(err);
      }
    });

export const HighlightedMarkdown = connectHighlight(
  ({ highlight, attributeName, hit }) => (
    <span className="ais-Hit--keyword">
      {highlight({
        attributeName,
        hit,
        highlightProperty: '_highlightResult',
      }).map(
        (v, i) =>
          v.isHighlighted ? (
            <em
              key={`split-${i}-${v.value}`}
              className="ais-Highlight__highlighted"
              dangerouslySetInnerHTML={safeMarkdown(v.value)}
            />
          ) : (
            <span
              key={`split-${i}-${v.value}`}
              className="ais-Highlight__nonHighlighted"
              dangerouslySetInnerHTML={safeMarkdown(v.value)}
            />
          )
      )}
    </span>
  )
);

const inlineRenderer = new marked.Renderer();
inlineRenderer.paragraph = function(text) {
  return text;
};

export const safeMarkdown = input => ({
  __html: xss(marked(unescape(input), { renderer: inlineRenderer })),
});
