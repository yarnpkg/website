import React, { Component } from 'react';
import { Configure, InstantSearch } from 'react-instantsearch/es/dom';
import { connectRefinementList } from 'react-instantsearch/es/connectors';

import SearchBox from './SearchBox';
import Results from './Results';
import withUrlSync from './withUrlSync';
import { algolia } from '../config';

const equals = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.reduce((a, b, i) => a && arr2[i], true);

// package overview page
// home page (/:lang/)
const shouldFocus = path =>
  path.includes('/packages') ||
  path.replace(/\/[a-zA-Z\-]+\/?/, '').length === 0;

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
    this.state = { tags: new Set(), owners: new Set() };
  }

  addTag = newTag => this.setState(({ tags }) => ({ tags: tags.add(newTag) }));

  addOwner = newOwner =>
    this.setState(({ owners }) => ({ owners: owners.add(newOwner) }));

  onRefineTag = newTags => this.setState(() => ({ tags: new Set(newTags) }));

  onRefineOwner = newOwners =>
    this.setState(() => ({ owners: new Set(newOwners) }));

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
            'repository',
            'githubRepo', // TODO: remove when we remove all references to this
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
          onRefine={this.onRefineTag}
        />
        <VirtualRefinementList
          attributeName="owner.name"
          defaultRefinement={[...this.state.owners]}
          onRefine={this.onRefineOwner}
        />
        <Results onTagClick={this.addTag} onOwnerClick={this.addOwner} />
      </InstantSearch>
    );
  }
}

export default withUrlSync(Search);
