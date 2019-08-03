import React from 'react';
import fetch from 'unfetch';
import marked from 'marked';
import xss from 'xss';
import unescape from 'unescape-html';

export { formatKeywords } from './formatKeywords';

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

export const packageJSONLink = packageName => ({
  packageJSONLink: `https://cdn.jsdelivr.net/npm/${packageName}/package.json`,
});

export const packageLink = name =>
  `${window.i18n.url_base}/package${
    process.env.NODE_ENV === 'production' ? '/' : '?'
  }${name}`;

export const searchLink = ({ query, keyword }) =>
  `${window.i18n.url_base}/packages?${query ? `q=${query}` : ''}${
    keyword ? `&keywords%5B0%5D=${keyword}` : ''
  }`;

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

export const get = ({ url, type, headers, ...rest }) =>
  fetch(url, { headers, ...rest })
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

const inlineRenderer = new marked.Renderer();
inlineRenderer.paragraph = function(text) {
  return text;
};

export const safeMarkdown = input => ({
  __html: xss(marked(unescape(input), { renderer: inlineRenderer })) || ' ',
});

export const i18nReplaceVars = (message, vars) =>
  message &&
  message.replace(/{([^}]+)}/gi, (match, varName) => vars[varName] || match);

// Contains the repositories that we know how to handle
const knownRepositoryHosts = new Set([
  'github.com',
  'gitlab.com',
  'bitbucket.org',
]);

export const isKnownRepositoryHost = host => knownRepositoryHosts.has(host);
