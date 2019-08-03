import React, { Component } from 'react';
import {
  Configure,
  InstantSearch,
  connectRefinementList,
} from 'react-instantsearch-dom';

import { SearchBox, Results } from './';
import withUrlSync from '../util/withUrlSync';
import { algolia, client } from '../util/config';

const equals = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.reduce((a, b, i) => a && arr2[i], true);

// package overview page
// home page (/:lang/)
const shouldFocus = path =>
  path.includes('/packages') ||
  path.replace(/\/[a-zA-Z\-]+\/?/, '').length === 0;

class FakeRefinementList extends Component {
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

const VirtualRefinementList = connectRefinementList(FakeRefinementList);

class RawSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: new Set(), owners: new Set() };
  }

  addTag = newTag => this.setState(({ tags }) => ({ tags: tags.add(newTag) }));

  addOwner = newOwner =>
    this.setState(({ owners }) => ({ owners: owners.add(newOwner) }));

  refineTag = newTags => this.setState(() => ({ tags: new Set(newTags) }));

  refineOwner = newOwners =>
    this.setState(() => ({ owners: new Set(newOwners) }));

  render() {
    const { searchState, onSearchStateChange } = this.props;

    return (
      <InstantSearch
        searchClient={client}
        indexName={algolia.indexName}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <Configure
          hitsPerPage={5}
          facets={['keywords']}
          analyticsTags={['yarnpkg.com']}
          attributesToRetrieve={[
            'deprecated',
            'description',
            'downloadsLast30Days',
            'repository',
            'homepage',
            'humanDownloadsLast30Days',
            'keywords',
            'license',
            'modified',
            'name',
            'owner',
            'version',
            'types',
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
          attribute="keywords"
          defaultRefinement={[...this.state.tags]}
          onRefine={this.refineTag}
        />
        <VirtualRefinementList
          attribute="owner.name"
          defaultRefinement={[...this.state.owners]}
          onRefine={this.refineOwner}
        />
        <Results onTagClick={this.addTag} onOwnerClick={this.addOwner} />
      </InstantSearch>
    );
  }
}

export const Search = withUrlSync(RawSearch);
