#!/usr/bin/env node

console.log('context', process.env.CONTEXT);
if (process.env.CONTEXT === 'deploy-preview') {
  console.log('sitemap generation skipped');
} else {
  // const algoliaSitemap = require('algolia-sitemap');
  // const { mkdirSync, rmdirSync, existsSync } = require('fs');
  // const algoliaConfig = {
  //   appId: 'OFCNCOG2CU',
  //   apiKey: process.env.ALGOLIA_BROWSE_KEY,
  //   indexName: 'npm-search',
  // };
  // function hitToParams(hit) {
  //   const url = ({ lang, name }) =>
  //     `https://yarnpkg.com/${lang}/package/${name}`;
  //   const loc = url({ lang: 'en', name: hit.name });
  //   const lastmod = new Date(hit.modified).toISOString();
  //   const priority = hit.downloadsRatio || 0.5;
  //   return {
  //     loc,
  //     lastmod,
  //     priority,
  //     alternates: {
  //       languages: ['fr', 'pt-BR', 'zh-Hans'],
  //       hitToURL: lang => url({ lang, name: hit.name }),
  //     },
  //   };
  // }
  // const path = `${__dirname}/../sitemaps`;
  // if (!existsSync(path)) {
  //   mkdirSync(path);
  // }
  // algoliaSitemap({
  //   algoliaConfig,
  //   sitemapLoc: 'https://yarnpkg.com/sitemaps',
  //   outputFolder: path,
  //   hitToParams,
  // })
  //   .then(() => console.log('Sitemap generated successfully'))
  //   .catch(e => {
  //     console.log(e);
  //     process.exit(1);
  //   });
}
