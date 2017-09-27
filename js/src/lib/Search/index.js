import React, { Component } from 'react';
import { Configure, InstantSearch } from 'react-instantsearch/dom';
import { connectRefinementList } from 'react-instantsearch/connectors';

import SearchBox from './SearchBox';
import Results from './Results';
import withUrlSync from './withUrlSync';
import { algolia } from '../config';

const equals = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.reduce((a, b, i) => a && arr2[i], true);

// package overview page
// home page (/:lang/)
const shouldFocus = path =>
  path.includes("/packages") || path.split("/").length === 3;

class RefinementList extends Component {
  componentWillReceiveProps(newProps) {
    const { currentRefinement, defaultRefinement, onRefine, refine } = newProps;
    const {
      currentRefinement: oldCurrentRefinement,
      defaultRefinement: oldDefaultRefinement,
    } = this.props;

    if (!equals(currentRefinement, oldCurrentRefinement)) {
      refine(currentRefinement);
      onRefine(currentRefinement);
    }

    if (!equals(defaultRefinement, oldDefaultRefinement)) {
      refine(defaultRefinement);
      onRefine(defaultRefinement);
    }
  }

  render() {
    return null;
  }
}

const VirtualRefinementList = connectRefinementList(RefinementList);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: new Set() };
    this.addTag = this.addTag.bind(this);
    this.onRefine = this.onRefine.bind(this);
  }

  addTag(newTag) {
    this.setState(({ tags }) => ({ tags: tags.add(newTag) }));
  }

  onRefine(newTags) {
    this.setState(() => ({ tags: new Set(newTags) }));
  }

  render() {
    const { searchState, onSearchStateChange } = this.props;

    return (
      <InstantSearch
        appId={algolia.appId}
        apiKey={algolia.apiKey}
        indexName={algolia.indexName}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <Configure
          hitsPerPage={5}
          facets={['keywords']}
          attributesToRetrieve={[
            'deprecated',
            'description',
            'downloadsLast30Days',
            'githubRepo',
            'homepage',
            'humanDownloadsLast30Days',
            'keywords',
            'license',
            'modified',
            'name',
            'owner',
            'version',
          ]}
          attributesToHighlight={['name', 'description', 'keywords']}
        />
        <SearchBox
          autoFocus={shouldFocus(window.location.pathname)}
          translations={{
            placeholder: window.i18n.search_placeholder,
          }}
        />
        <VirtualRefinementList
          attributeName="keywords"
          defaultRefinement={[...this.state.tags]}
          onRefine={this.onRefine}
        />
        <Results onTagClick={this.addTag} />
      </InstantSearch>
    );
  }
}

export default withUrlSync(Search);
