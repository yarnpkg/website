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

const Unpkg = ({ name }) => (
  <Di
    title="unpkg"
    description={
      <a
        href={`https://unpkg.com/${name}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        unpkg.com/{name}/
      </a>
    }
  />
);

const BundleRun = ({ name }) => (
  <Di
    title="bundle.run"
    description={
      <a
        href={`https://bundle.run/${name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        bundle.run/{name}
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
                <Unpkg name={this.props.name} />
                <BundleRun name={this.props.name} />
            </dl>
        </article>
    );
  }
}

export default Cdn;
