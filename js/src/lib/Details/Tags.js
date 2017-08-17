import React, { Component } from 'react';
import { Di } from './';

export default class Tags extends Component {
  render() {
    const { tags, name } = this.props;
    const tagNames = Object.keys(tags);
    if (tagNames.length === 0) {
      return null;
    }

    return (
      <article className="details-side--tags">
        <h1>
          {window.i18n.detail.tags}
        </h1>
        <dl>
          {tagNames.map(tag =>
            <Di
              key={tag}
              title={
                <code>
                  {tag}
                </code>
              }
              description={tags[tag]}
            />
          )}
        </dl>
      </article>
    );
  }
}
