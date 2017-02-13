import React from 'react';
import { createConnector } from 'react-instantsearch';
import highlightTags from 'react-instantsearch/src/core/highlightTags';
import { InstantSearch, Configure, Hits, SearchBox, Pagination, Highlight } from 'react-instantsearch/dom';
import moment from 'moment';

const Search = () => (
  <InstantSearch
    appId='OFCNCOG2CU'
    apiKey='f54e21fa3a2a0160595bb058179bfb1e'
    indexName='npm-search'
    className='pkg-search'
  >
    <Configure
      hitsPerPage={5}
    />
    <SearchBox />
    <Results />
  </InstantSearch>
);

const Results = createConnector({
  displayName: 'ConditionalResults',
  getProvidedProps(props, searchState, searchResults) {
    const noResults = searchResults.results ? searchResults.results.nbHits === 0 : false;
    return { query: searchState.query, noResults };
  },
})(({noResults, query}) => {
  if (isEmpty(query)) {
    return <span></span>;
  } else if (noResults) {
    return <div>No results have been found for {query}</div>;
  } else {
    return <div>
      <Hits hitComponent={Hit} id="pkg-search-Hits" />
      <Pagination
        showFirst={false}
        showLast={false}
        scrollTo={true}
      />
    </div>;
  }
});

function parseHighlightedAttribute({
  preTag = highlightTags.highlightPreTag,
  postTag = highlightTags.highlightPostTag,
  highlightedValue,
}) {
  const splitByPreTag = highlightedValue.split(preTag);
  const firstValue = splitByPreTag.shift();
  const elements = firstValue === '' ? [] : [{value: firstValue, isHighlighted: false}];

  if (postTag === preTag) {
    let isHighlighted = true;
    splitByPreTag.forEach(split => {
      elements.push({value: split, isHighlighted});
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

const isEmpty = (item) => typeof item === 'undefined' || item.length < 1;

const encode = (val) => encodeURIComponent(val);

function getDownloadBucket(dl) {
  if ( dl < 1000) {
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

function formatKeywords(keywords, highlightedKeywords, maxKeywords = 4) {
  // if (isEmpty(keywords)) return keywords;
  // const sorted = keywords.sort((k1, k2) => {
  //   // sort keywords by match level
  //   const i1 = keywords.findIndex(el => el === k1);
  //   const i2 = keywords.findIndex(el => el === k2);
  //   if (highlightedKeywords[i1].matchLevel !== highlightedKeywords[i2].matchLevel) {
  //     if (highlightedKeywords[i1].matchLevel === 'full') return -1;
  //     if (highlightedKeywords[i2].matchLevel === 'full') return 1;
  //     return highlightedKeywords[i1].matchLevel === 'partial' ? -1 : 1;
  //   }
  //   if (highlightedKeywords[i1].matchedWords.length !== highlightedKeywords[i2].matchedWords.length) {
  //     return highlightedKeywords[i2].matchedWords.length - highlightedKeywords[i1].matchedWords.length;
  //   }
  //   if (highlightedKeywords[i1].matchedWords.join('').length !== highlightedKeywords[i2].matchedWords.join('').length) {
  //     return highlightedKeywords[i2].matchedWords.join('').length - highlightedKeywords[i1].matchedWords.join('').length;
  //   }
  //   return 0;
  // }).slice(0, maxKeywords);

  // console.log(keywords);

  // return sorted.map(_keyword => {
  //   let keyword = _keyword.value;
  //   // const url = search._createURL(search.helper.state.toggleRefinement('keywords', keyword.replace(/<\/?em>/g, '')), { absolute: true });
  //   return (
  //     <a class="ais-Hit--keyword" href={''/*url*/}>{keyword}</a>
  //   )
  // }).reduce((prev, curr) => [prev, ', ', curr]);

  if (isEmpty(keywords)) return keywords;
  return highlightedKeywords.sort((k1, k2) => {
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
  }).slice(0, maxKeywords).map(_keyword => {
    let keyword = _keyword.value;
    // const url = search._createURL(search.helper.state.toggleRefinement('keywords', keyword.replace(/<\/?em>/g, '')), { absolute: true });
    const highlighted = parseHighlightedAttribute({highlightedValue: keyword});
    console.log(highlighted);
    const content = highlighted.map((v, i) => {
      const key = `split-${i}-${v.value}`;
      if (!v.isHighlighted) {
        return <span key={key} className="ais-Highlight__nonHighlighted">{v.value}</span>;
      }
      return <em key={key} className="ais-Highlight__highlighted">{v.value}</em>;
    });
    return (
      <a class="ais-Hit--keyword" href={''/*url*/}>{content}</a>
    )
  }).reduce((prev, curr) => [prev, ', ', curr]);
};

const Hit = ({hit}) => (
  <div class="ais-Hits--item">
    <a class="ais-Hit--name" href={`/packages/${hit.name}`}>
      <Highlight attributeName="name" hit={hit}/>
    </a>
    <span class="ais-Hit--popular" title="Downloads last 30 days">{hit.downloadsLast30Days}</span>
    <span class="ais-Hit--license">{hit.license}</span>
    <span class="ais-Hit--version">{hit.version}</span>
    <p class="ais-Hit--description">
      <Highlight attributeName="description" hit={hit} />
    </p>
    <a class="ais-Hit--ownerLink" href={hit.owner}>
      <img width="20" height="20" class="ais-Hit--ownerAvatar" src={`https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/${hit.owner.avatar}`} />{hit.owner.name}
    </a>
    <span class="ais-Hit--lastUpdate">{moment(hit.modified).fromNow()}</span>
    <span class="ais-Hit--keywords hidden-sm-down">
      {formatKeywords(hit.keywords, hit._highlightResult.keywords)}
    </span>
    <div class="ais-Hit--links">
      <span class="ais-Hit--link-npm">
        <a href={`https://www.npmjs.com/package/${hit.name}`} title={`NPM page for ${hit.name}`}>npm</a>
      </span>
      {
        hit.githubRepo ? 
          <span class="ais-Hit--link-github">
            <a title={`Github repository of ${hit.name}`} href={`https://github.com/${encode(hit.githubRepo.user)}/${encode(hit.githubRepo.project)}${hit.githubRepo.path}`}>GitHub</a>
          </span>
          : ''
      }
    </div>
  </div>
);

export default Search;
