import React, { Component } from 'react';
import { Di } from './';

const _localeVersion = pubDate =>
  new Date(pubDate).toLocaleDateString(window.i18n.active_language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default class Versions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingMore: false,
    };
  }

  _toggleShowMore() {
    this.setState(({ isShowingMore }) => ({
      isShowingMore: !isShowingMore,
    }));
  }

  render() {
    const { versions } = this.props;
    const { isShowingMore } = this.state;

    const buttonText = isShowingMore
      ? window.i18n.detail.hide
      : window.i18n.detail.display_all;
    const versionsToShow = isShowingMore
      ? Object.keys(versions).reverse()
      : Object.keys(versions).reverse().slice(0, 3);

    return (
      <article className="details-side--versions">
        <h1>{window.i18n.detail.versions}</h1>
        <dl>
          {versionsToShow.map(version => (
            <Di
              key={version}
              title={_localeVersion(versions[version])}
              description={version}
            />
          ))}
        </dl>
        {versionsToShow.length > 2 &&
          <button
            onClick={() => this._toggleShowMore()}
            className="readMore--button"
          >
            {buttonText}
            <img
              src="/assets/detail/ico-readmore.svg"
              alt=""
              className="readMore--icon"
              style={{ transform: isShowingMore ? 'rotate(180deg)' : '' }}
            />
          </button>}
      </article>
    );
  }
}
