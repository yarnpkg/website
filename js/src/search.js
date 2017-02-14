import instantsearch from 'instantsearch.js/dist/instantsearch-preact.js';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

const $results = $('#pkg-search-results');
const $home = $('#pkg-featured');
const $inputClear = $('#pkg-search-btn-clear');
const maxKeywords = 4;
const search = instantsearch({
  appId: 'OFCNCOG2CU',
  apiKey: 'f54e21fa3a2a0160595bb058179bfb1e',
  indexName: 'npm-search',
  urlSync: {
    trackedParameters: ['query', 'page', 'facetsRefinements'],
    updateOnEveryKeyStroke: false,
    threshold: 900
  },
  searchParameters: {
    facets: ['keywords']
  },
  searchFunction(helper) {
    if (helper.state.query === '') {
      $results.hide();
      $home.show();
      $inputClear.hide();
      return;
    }
    $inputClear.show();
    const page = search.helper.state.page;
    search.helper.setQuery(helper.state.query.replace(/\b(js|javascript)\b/ig, ' ')); // skip common words
    search.helper.setQueryParameter('optionalFacetFilters', `name:${helper.state.query}`); // boost exact matches
    search.helper.setPage(page);
    helper.search();
  }
});

search.on('render', () => {
  $home.hide();
  $results.show();
});

$inputClear.on('click', () => {
  search.helper.setQuery('').search();
  $('#pkg-search-input').val('').focus();
});

search.addWidget(instantsearch.widgets.searchBox({
  container: '#pkg-search-input',
  placeholder: 'webpack, babel-plugin, lodash…'
}));

search.addWidget(instantsearch.widgets.currentRefinedValues({
  container: '#pkg-search-refinements',
  clearAll: 'after'
}));

search.addWidget(instantsearch.widgets.hits({
  container: '#pkg-search-hits',
  hitsPerPage: 10,
  templates: {
    item: itemTemplate,
    empty: emptyTemplate
  }
}));

search.addWidget(instantsearch.widgets.pagination({
  container: '#pkg-search-pagination',
  cssClasses: {
    root: 'pagination',
    item: 'page-item',
    active: 'active',
    disabled: 'disabled',
    link: 'page-link'
  },
  showFirstLast: false,
  labels: {
    previous: 'previous',
    next: 'next'
  },
  scrollTo: true
}));

search.start();

function itemTemplate(hit) {
  const pkgLink = `https://www.npmjs.com/package/${encode(hit.name)}`;

  const name = $('<a class="ais-hit--name" />').attr('href', pkgLink).html(highlight('name', hit)).prop('outerHTML');

  const popular = hit.humanDownloadsLast30Days ? $('<span class="ais-hit--popular" title="Downloads last 30 days" />')
    .addClass(getDownloadBucket(hit.downloadsLast30Days))
    .text(hit.humanDownloadsLast30Days)
    .prop('outerHTML') : '';

  const license = hit.license ? $('<span class="ais-hit--license" />').text(hit.license).prop('outerHTML') : '';

  const version = $('<span class="ais-hit--version" />').text(`v${hit.version}`).prop('outerHTML');

  const description = $('<p class="ais-hit--description" />').html(hit.description ? highlight('description', hit) : 'No description found in package.json.').prop('outerHTML');

  const owner = $('<a class="ais-hit--ownerLink" />').attr('href', hit.owner.link)
    .append($('<img width="20" height="20" class="ais-hit--ownerAvatar" />').attr('src', `https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/${hit.owner.avatar}`))
    .append(document.createTextNode(hit.owner.name))
    .prop('outerHTML');

  const keywords = 'keywords' in hit._highlightResult && hit.keywords.length > 0 ?
    $('<span class="ais-hit--keywords hidden-sm-down" />').append(formatKeywords(hit._highlightResult.keywords)).prop('outerHTML') : '';

  const lastUpdate = $('<span class="ais-hit--lastUpdate" />').text(distanceInWordsToNow(new Date(hit.modified))).prop('outerHTML');

  const githubRepo = hit.githubRepo ?
    $('<span class="ais-hit--link-github" />').append(
      $('<a>GitHub</a>').attr('title', `Github repository of ${hit.name}`)
        .attr('href', `https://github.com/${encode(hit.githubRepo.user)}/${encode(hit.githubRepo.project)}${hit.githubRepo.path}`)) : '';

  const homepage = hit.homepage ? $('<span class="ais-hit--link-homepage" />').append(
    $('<a>Homepage</a>').attr('href', hit.homepage).attr('title', `Homepage of ${hit.name}` )) : '';

  const npm = $('<span class="ais-hit--link-npm" />').append($('<a>npm</a>').attr('href', pkgLink).attr('title', `NPM page for ${hit.name}`));

  const links = $('<div class="ais-hit--links" />').append(npm).append(githubRepo).append(homepage).prop('outerHTML');

  return [name, popular, license, version, description, owner, lastUpdate, keywords, links].join(' ');
}

function emptyTemplate(state) {
  return `No results matching "${$('<em />').text(state.query).prop('outerHTML')}".`;
}

function escapeButHighlight(str) {
  return $('<div />').text(str).html().replace(/&lt;(\/?)em&gt;/g, '<$1em>');
}

function highlight(attributeName, hit) {
  return hit[attributeName] ? escapeButHighlight(hit._highlightResult[attributeName].value) : '';
}

function encode(val) {
  return encodeURIComponent(val);
}

function getDownloadBucket(dl) {
  if ( dl < 1000) {
    return null
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

function formatKeywords(keywords) {
  return keywords.sort((k1, k2) => {
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
  }).slice(0, maxKeywords).map(keyword => {
    var keyword = keyword.value;
    const url = search._createURL(search.helper.state.toggleRefinement('keywords', keyword.replace(/<\/?em>/g, '')), { absolute: true });
    return $('<a class="ais-hit--keyword" />').attr('href', url).html(escapeButHighlight(keyword)).prop('outerHTML');
  }).join(', ');
}

$(document).on('click', 'a.ais-hit--keyword', e => {
  e.preventDefault();
  search.helper.toggleRefinement('keywords', $(e.target).text()).search();
});

// init featured packages
const index = search.client.initIndex('npm-search');
const featuredPackages = $home.find('.pkg-featured-pkg').map((i, e) => $(e).data('name')).toArray();
index.getObjects(featuredPackages).then(content => {
  const results = content.results;

  results.forEach(hit => {
    const $elt = $(`.pkg-featured-pkg[data-name="${hit.objectID}"]`);

    const name = $('<a class="ais-hit--name" />').text(hit.name).attr('href', hit.homepage || `https://www.npmjs.com/package/${encode(hit.name)}`).prop('outerHTML');

    const description = $('<p />').text(hit.description).prop('outerHTML');

    const owner = $('<a class="ais-hit--ownerLink" />').attr('href', hit.owner.link)
      .append($('<img width="20" height="20" class="ais-hit--ownerAvatar" />').attr('src', `https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/${hit.owner.avatar}`))
      .append(document.createTextNode(hit.owner.name))
      .prop('outerHTML');

    const keywords = $('<span class="ais-hit--keywords hidden-sm-down" />');
    (hit.keywords || []).slice(0, maxKeywords).forEach((k, i) => {
      keywords.append($('<a />').text(k).attr('href', `/search?q=${k}`));
      if (i !== maxKeywords - 1) {
        keywords.append(document.createTextNode(', '));
      }
    });

    $elt.html([owner, name, description, keywords.prop('outerHTML')].join(' '));
  });
});
