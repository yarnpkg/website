import React from 'react';
import marked from 'marked';
import xss from 'xss';
import hljs from 'highlight.js';

import { prefixURL } from '../util';

const GITHUB = {
  main: 'https://github.com',
  raw: 'https://raw.githubusercontent.com',
};

marked.Lexer.rules.gfm.heading = marked.Lexer.rules.normal.heading;
marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading;

const renderAndEscapeMarkdown = ({ source, githubRepo }) => {
  const renderer = new marked.Renderer();

  if (githubRepo) {
    const { user, project, path, head } = githubRepo;
    const prefixImage = href =>
      prefixURL(href, {
        base: GITHUB.raw,
        user,
        project,
        head: head || 'master',
        path,
      });
    const prefixLink = href =>
      prefixURL(href, {
        base: GITHUB.main,
        user,
        project,
        head: `blob/${head || 'master'}`,
        path: `${path}`,
      });

    // manually ask for sanitation of svgs, otherwise it will have wrong content-type
    function sanitize(href) {
      if (
        href.indexOf('//') === -1 &&
        String.prototype.endsWith &&
        href.endsWith('.svg')
      ) {
        return `${href}?sanitize=true`;
      }
      return href;
    }

    renderer.image = (href, title, text) =>
      `<img src="${prefixImage(
        sanitize(href)
      )}" title="${title}" alt="${text}"/>`;

    renderer.link = (href, title, text) => {
      // wrongly linked comments
      // see https://github.com/yarnpkg/website/issues/685
      if (text.startsWith('!--')) {
        return '';
      }
      return `<a href="${prefixLink(href)}" title="${title}">${text}</a>`;
    };

    renderer.html = function(html) {
      return html.replace(
        /(src|href)="([^"]*)/g,
        (match, type, href) =>
          `${type}="${type === 'href' ? prefixLink(href) : prefixImage(href)}`
      );
    };
  }

  renderer.code = function(code, lang) {
    const { log } = console;
    log(code, lang); // just for debugging
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="rougeHighlight">${hljs.highlight(lang, code)
          .value}</code></pre>`;
      } catch (err) {
        console.error('highlight', err);
      }
    }

    try {
      return `<pre><code class="rougeHighlight">${hljs.highlightAuto(code)
        .value}</code></pre>`;
    } catch (err) {
      console.error('highlightAuto', err);
    }

    return `<pre><code class="rougeHighlight">${code}</code></pre>`;
  };

  const html = marked(source, { renderer });
  console.log('html', html);
  console.log('escaped', xss(html));
  return xss(html);
};

const Markdown = ({ source, githubRepo }) => (
  <article
    dangerouslySetInnerHTML={{
      __html: renderAndEscapeMarkdown({
        source,
        githubRepo,
      }),
    }}
  />
);

export default Markdown;
