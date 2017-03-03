import React from 'react';
import algoliasearch from 'algoliasearch';
import marked from 'marked-promise';

import Aside from './Aside';
import Header from './Header';
import JSONLDItem from './JSONLDItem';
import schema from '../schema';

const client = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e');
const index = client.initIndex('npm-search');

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...schema,
    };
  }

  componentWillMount() {
    index.getObject(this.props.objectID).then(content => {
      this.setState(content);
      document.title = `${this.props.objectID} | Yarn`;
      this.getDocuments();
    });
    //.catch(error => location.href = '/package-not-found');
  }

  getDocuments() {
    const get = (url, item) =>
      fetch(url)
        .then(res => res.text())
        .then(res => marked(res, { sanitize: true, smartypants: true }))
        .then(res => this.setState({
          [item]: res,
        }));
    if (this.state.githubRepo) {
      Promise.all([
        get(
          `https://raw.githubusercontent.com/${this.state.githubRepo.user}/${this.state.githubRepo.project}/${this.state.githubRepo.path
            ? this.state.githubRepo.path.replace(/\/tree\//, '')
            : 'master'}/README.md`,
          'readme',
        ),
        get(
          `https://raw.githubusercontent.com/${this.state.githubRepo.user}/${this.state.githubRepo.project}/${this.state.githubRepo.path
            ? this.state.githubRepo.path.replace(/\/tree\//, '')
            : 'master'}/CHANGELOG.md`,
          'CHANGELOG',
        ),
      ]);
    }
  }

  render() {
    return (
      <div className="details row">
        <section className="details-main col-lg-8">
          <Header
            name={this.state.name}
            owner={this.state.owner}
            downloadsLast30Days={this.state.downloadsLast30Days}
            humanDownloadsLast30Days={this.state.humanDownloadsLast30Days}
            license={this.state.license}
            keywords={this.state.keywords}
          />
          {this.state.readme &&
            <section id="readme">
              <h3>Readme</h3>
              <div dangerouslySetInnerHTML={{ __html: this.state.readme }} />
            </section>}
          {this.state.changelog &&
            <section id="changelog">
              <h3>Changelog</h3>
              <div dangerouslySetInnerHTML={{ __html: this.state.changelog }} />
            </section>}
          <details>
            <summary>full json</summary>
            <pre>
              {JSON.stringify(this.state, null, '  ')}
            </pre>
          </details>
        </section>

        <Aside
          name={this.state.name}
          githubRepo={this.state.githubRepo}
          homepage={this.state.homepage}
          contributors={this.state.owners}
        />

        <JSONLDItem
          name={this.state.name}
          description={this.state.description}
          keywords={this.state.keywords}
        />
      </div>
    );
  }
}

export default Details;
