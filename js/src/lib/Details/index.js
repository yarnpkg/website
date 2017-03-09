import React from 'react';
import algoliasearch from 'algoliasearch';
import ReactMarkdown, { uriTransformer } from 'react-markdown';
import fetch from 'unfetch';

import Aside from './Aside';
import Header from './Header';
import JSONLDItem from './JSONLDItem';
import ReadMore from './ReadMore';
import schema from '../schema';

const client = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e');
const index = client.initIndex('npm-search');

const prefixURL = (url, { base, user, project, head, path }) => {
  if (url.indexOf('//') > 0) {
    return url;
  } else {
    return new URL(
      (path ? path.replace(/^\//, '') + '/' : '') +
        url.replace(/^(\.?\/?)/, ''),
      `${base}/${user}/${project}/${path ? '' : `${head}/`}`,
    );
  }
};

const Markdown = ({ source, githubRepo: { user, project, path }, gitHead }) => (
  <ReactMarkdown
    source={source}
    transformLinkUri={url => prefixURL(uriTransformer(url), {
      base: 'https://github.com',
      user,
      project,
      head: gitHead ? `tree/${gitHead}` : 'tree/master',
      path,
    })}
    transformImageUri={url => prefixURL(uriTransformer(url), {
      base: 'https://raw.githubusercontent.com',
      user,
      project,
      head: gitHead ? gitHead : 'master',
      path,
    })}
  />
);

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
    const status = res => new Promise((resolve, reject) => {
      if (res.status >= 200 && res.status < 300) {
        if (res.status === 202) {
          reject(res);
        }
        resolve(res);
      } else {
        reject(res);
      }
    });

    const get = ({ url, item, type }) =>
      fetch(url)
        .then(status)
        .then(res => res[type]())
        .then(res => this.setState({ [item]: res }))
        .catch(err => {
          // github uses 202 to make you try again a bit later
          if (err.status === 202) {
            setTimeout(
              () => {
                get(url, item);
              },
              200,
            );
          } else {
            console.warn(err);
          }
        });

    if (this.state.githubRepo.user && this.state.githubRepo.project) {
      get({
        url: prefixURL(uriTransformer('CHANGELOG.md'), {
          base: 'https://raw.githubusercontent.com',
          user: this.state.githubRepo.user,
          project: this.state.githubRepo.project,
          head: this.state.gitHead ? this.state.gitHead : 'master',
          path: this.state.githubRepo.path.replace(/\/tree\//, ''),
        }),
        item: 'changelog',
        type: 'text',
      });

      if (
        typeof this.state.readme === 'undefined' ||
        this.state.readme.length === 0 ||
        this.state.readme === 'ERROR: No README data found!'
      ) {
        get({
          url: prefixURL(uriTransformer('README.md'), {
            base: 'https://raw.githubusercontent.com',
            user: this.state.githubRepo.user,
            project: this.state.githubRepo.project,
            head: this.state.gitHead ? this.state.gitHead : 'master',
            path: this.state.githubRepo.path.replace(/\/tree\//, ''),
          }),
          item: 'readme',
          type: 'text',
        });
      }

      get({
        url: `https://api.github.com/repos/${this.state.githubRepo.user}/${this.state.githubRepo.project}/stats/commit_activity`,
        item: 'activity',
        type: 'json',
      });
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
            description={this.state.description}
            license={this.state.license}
            keywords={this.state.keywords}
            version={this.state.version}
          />
          <section id="readme" className="details-doc">
            <h3 className="details-doc--title details-doc--title__readme">
              <a href="#readme">readme</a>
            </h3>
            {this.state.readme
              ? <ReadMore
                  text={window.i18n.display_full_readme}
                  className="details-doc--content"
                >
                  <Markdown
                    source={this.state.readme}
                    githubRepo={this.state.githubRepo}
                    gitHead={this.state.gitHead}
                  />
                </ReadMore>
              : <div>no readme found 😢</div>}
          </section>
          {this.state.changelog &&
            <section id="changelog" className="details-doc">
              <h3 className="details-doc--title details-doc--title__changelog">
                <a href="#changelog">changelog</a>
              </h3>
              <ReadMore
                text={window.i18n.display_full_changelog}
                className="details-doc--content"
              >
                <Markdown
                  source={this.state.changelog}
                  githubRepo={this.state.githubRepo}
                  gitHead={this.state.gitHead}
                />
              </ReadMore>
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
          activity={this.state.activity}
          downloads={this.state.downloadsLast30Days}
          humanDownloads={this.state.humanDownloadsLast30Days}
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
