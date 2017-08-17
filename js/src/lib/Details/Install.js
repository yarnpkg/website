import React, { Component } from 'react';
import Copyable from './Copyable';

export default class Install extends Component {
  render() {
    const { name, onOpenFileBrowser } = this.props;
    return (
      <article className="details-side--copy">
        <h1>
          {window.i18n.detail.use_it}
        </h1>
        <Copyable pre="$ " tag="code">
          yarn add {name}
        </Copyable>
        <div>
          <a
            className="details-side--runkit"
            href={`https://runkit.com/npm/${name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {window.i18n.detail.try_in_runkit}
          </a>
          {' · '}
          <a href="#" onClick={onOpenFileBrowser}>
            {window.i18n.detail.browse_files}
          </a>
        </div>
      </article>
    );
  }
}
