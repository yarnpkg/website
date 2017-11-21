import React, { Component } from 'react';
import { Di } from './';

const JsDelivr = ({ name }) => (
  <Di
    title="jsDelivr"
    description={
      <a
        href={`https://cdn.jsdelivr.net/npm/${name}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        cdn.jsdelivr.net/npm/{name}/
      </a>
    }
  />
);

class Cdn extends Component {
  render() {
    return (
        <article className="details-side--cdns">
            <h1>{window.i18n.detail.cdns}</h1>
            <dl>
                <JsDelivr name={this.props.name} />
            </dl>
        </article>
    );
  }
}

export default Cdn;
