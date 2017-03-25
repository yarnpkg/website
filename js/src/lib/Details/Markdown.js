import React from 'react';
import marked from 'marked';
import xss from 'xss';

import { prefixURL } from '../util';

marked.Lexer.rules.gfm.heading = marked.Lexer.rules.normal.heading;
marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading;

const renderAndEscapeMarkdown = ({ source, githubRepo, gitHead }) => {
  const renderer = new marked.Renderer();

  if (githubRepo) {
    const { user, project, path } = githubRepo;
    renderer.image = function(href, title, text) {
      return `<img src="${prefixURL(href, {
        base: 'https://raw.githubusercontent.com',
        user,
        project,
        head: gitHead ? gitHead : 'master',
        path,
      })}" title="${title}" alt="${text}"/>`;
    };

    renderer.link = function(href, title, text) {
      return `<a href="${prefixURL(href, {
        base: 'https://github.com',
        user,
        project,
        head: gitHead ? `tree/${gitHead}` : 'tree/master',
        path,
      })}" title="${title}">${text}</a>`;
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
