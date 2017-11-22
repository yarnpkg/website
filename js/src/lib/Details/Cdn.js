import React, { Component } from 'react';
import { Di } from './';

const JsDelivr = ({ name, version }) => (
  <Di
    title="jsDelivr"
    description={
      <a
        href={`https://cdn.jsdelivr.net/npm/${name}@${version}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        cdn.jsdelivr.net/npm/{name}/
      </a>
    }
  />
);

const Unpkg = ({ name, version }) => (
  <Di
    title="unpkg"
    description={
      <a
        href={`https://unpkg.com/${name}@${version}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        unpkg.com/{name}/
      </a>
    }
  />
);

const BundleRun = ({ name, version }) => (
  <Di
    title="bundle.run"
    description={
      <a
        href={`https://bundle.run/${name}@${version}`}
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
                <JsDelivr name={this.props.name} version={this.props.version} />
                <Unpkg name={this.props.name} version={this.props.version} />
                <BundleRun name={this.props.name} version={this.props.version} />
            </dl>
        </article>
    );
  }
}

export default Cdn;
