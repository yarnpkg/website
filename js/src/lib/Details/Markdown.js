import React from 'react';
import marked from 'marked';
import xss from 'xss';

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
    const prefixImage = (href, base) =>
      prefixURL(href, {
        base,
        user,
        project,
        head: head ? head : 'master',
        path,
      });
    const prefixLink = (href, base) =>
      prefixURL(href, {
        base,
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
        sanitize(href),
        GITHUB.raw
      )}" title="${title}" alt="${text}"/>`;

    renderer.link = (href, title, text) => {
      // wrongly linked comments
      // see https://github.com/yarnpkg/website/issues/685
      if (text.startsWith('!--')) {
        return '';
      }
      return `<a href="${prefixLink(
        href,
        GITHUB.main
      )}" title="${title}">${text}</a>`;
    };

    renderer.html = function(html) {
      return html.replace(
        /(src|href)="([^"]*)/g,
        (match, type, href) =>
          `${type}="${prefix(href, type === 'href' ? GITHUB.main : GITHUB.raw)}`
      );
    };
  }

  const html = marked(source, { renderer, mangle: false });
  const escaped = xss(html);
  return escaped;
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
