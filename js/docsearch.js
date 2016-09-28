/* eslint-disable no-var */
/* eslint-disable no-undef */

// For Algolia search
(function() {

  // Algolia
  docsearch({
    apiKey: '421f79d033cee73a376aba52e4f572eb', // This is Nuclide id. Change to Yarn when we get it
    indexName: 'nuclide',
    inputSelector: '#algolia-doc-search',
  });

}());
