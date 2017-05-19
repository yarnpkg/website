#!/usr/bin/env node

if (process.env.CONTEXT === 'deploy-preview') {
  console.log('sitemap generation skipped');
} else {
  const algoliaSitemap = require('algolia-sitemap');
  const { mkdirSync } = require('fs');

  const algoliaConfig = {
    appId: 'OFCNCOG2CU',
    apiKey: process.env.ALGOLIA_BROWSE_KEY,
    indexName: 'npm-search',
  };

  function hitToParams(hit) {
    const url = ({ lang, name }) =>
      `https://yarnpkg.com/${lang}/package/${name}`;
    const loc = url({ lang: 'en', name: hit.name });
    const lastmod = new Date(hit.modified).toISOString();
    const priority = hit.downloadsRatio;
    return {
      loc,
      lastmod,
      priority,
      alternates: {
        languages: ['fr', 'pt-BR', 'zh-Hans'],
        hitToURL: lang => url({ lang, name: hit.name }),
      },
    };
  }

  const path = `${__dirname}/../sitemaps`;

  mkdirSync(`${__dirname}/../sitemaps`);

  algoliaSitemap({
    algoliaConfig,
    sitemapLocation: {
      href: 'https://yarnpkg.com/sitemaps',
      path,
    },
    hitToParams,
  });
}
