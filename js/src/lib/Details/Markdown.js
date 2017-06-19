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

const renderAndEscapeMarkdown = ({ source, githubRepo, gitHead }) => {
  const renderer = new marked.Renderer();

  if (githubRepo) {
    const { user, project, path } = githubRepo;
    const prefix = (href, base) =>
      prefixURL(href, {
        base,
        user,
        project,
        head: gitHead ? gitHead : 'master',
        path,
      });

    renderer.image = (href, title, text) =>
      `<img src="${prefix(href, GITHUB.raw)}" title="${title}" alt="${text}"/>`;

    renderer.link = (href, title, text) =>
      `<a href="${prefix(href, GITHUB.main)}" title="${title}">${text}</a>`;

    renderer.html = function(html) {
      return html.replace(
        /(src|href)="([^"]*)/g,
        (match, type, href) =>
          `${type}="${prefix(href, type === 'href' ? GITHUB.main : GITHUB.raw)}`
      );
    };
  }

  const html = marked(source, { renderer });
  const escaped = xss(html);
  return escaped;
};

const Markdown = ({ source, githubRepo, gitHead }) => (
  <article
    dangerouslySetInnerHTML={{
      __html: renderAndEscapeMarkdown({
        source,
        githubRepo,
        gitHead,
      }),
    }}
  />
);

export default Markdown;
