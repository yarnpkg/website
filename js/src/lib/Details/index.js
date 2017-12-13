import React, { Component } from 'react';
import bytes from 'bytes';
import algoliasearch from 'algoliasearch/lite';

import Aside from './Aside';
import FileBrowser from './FileBrowser';
import Copyable from './Copyable';
import Header from './Header';
import JSONLDItem from './JSONLDItem';
import ReadMore from './ReadMore';
import Markdown from './Markdown';
import schema from '../schema';
import { prefixURL, get, packageLink } from '../util';
import { algolia } from '../config';

const client = algoliasearch(algolia.appId, algolia.apiKey);
const index = client.initIndex(algolia.indexName);

const readmeErrorMessage = 'ERROR: No README data found!';

export const Di = ({ icon, title, description }) => (
  <div className="d-flex justify-items-between w-100">
    {icon && <img src={`/assets/detail/ico-${icon}.svg`} alt="" />}
    <dt>{title}</dt>
    <span className="dotted flex-grow" />
    <dd>{description}</dd>
  </div>
);

function setHead({ name, description }) {
  const head = document.querySelector('head');
  const permalink = `https://yarnpkg.com${packageLink(name)}`;
  head.querySelector('meta[property="og:title"]').setAttribute('content', name);
  document.title = `${name} | Yarn`;
  head
    .querySelector('meta[name=description]')
    .setAttribute('content', description);
  head
    .querySelector('meta[property="og:description"]')
    .setAttribute('content', description);
  head
    .querySelector('meta[property="og:url"]')
    .setAttribute('content', permalink);
  head.querySelector('link[rel=canonical]').setAttribute('href', permalink);
}

const OBJECT_DOESNT_EXIST = 'ObjectID does not exist';

class Details extends Component {
  constructor(props) {
    super(props);
    this.getGithub = this.getGithub.bind(this);
    this.state = {
      ...schema,
      isBrowsingFiles: false,
    };
  }

  componentDidMount() {
    index
      .getObject(this.props.objectID)
      .then(content => {
        this.setState(prevState => ({ ...content, loaded: true }));
        setHead(content);
        this.getDocuments();
      })
      .catch(e => {
        if (e.message === OBJECT_DOESNT_EXIST) {
          this.setState({
            objectDoesntExist: true,
          });
        }
      });
  }

  getGithub({ url, state }) {
    return get({
      url: `https://api.github.com/${url}`,
      type: 'json',
    })
      .then(res => this.setState({ [state]: res }))
      .catch(err => {
        if (err === 'retry') {
          setTimeout(this.getGithub({ url, state }), 200);
        }
      });
  }

  getDocuments() {
    if (
      this.state.githubRepo &&
      this.state.githubRepo.user &&
      this.state.githubRepo.project
    ) {
      if (this.state.changelogFilename) {
        get({
          url: this.state.changelogFilename,
          type: 'text',
        }).then(res => this.setState({ changelog: res }));
      }

      if (
        typeof this.state.readme === 'undefined' ||
        this.state.readme.length === 0 ||
        this.state.readme === readmeErrorMessage
      ) {
        get({
          url: prefixURL('README.md', {
            base: 'https://raw.githubusercontent.com',
            user: this.state.githubRepo.user,
            project: this.state.githubRepo.project,
            head: this.state.githubRepo.head
              ? this.state.githubRepo.head
              : 'master',
            path: this.state.githubRepo.path.replace(/\/tree\//, ''),
          }),
          type: 'text',
        }).then(res => this.setState({ readme: res }));
      }

      this.getGithub({
        url: `repos/${this.state.githubRepo.user}/${
          this.state.githubRepo.project
        }/stats/commit_activity`,
        state: 'activity',
      });

      this.getGithub({
        url: `repos/${this.state.githubRepo.user}/${
          this.state.githubRepo.project
        }`,
        state: 'github',
      });
    }

    const { name, version } = this.state;

    get({
      url: `https://bundlephobia.com/api/size?package=${name}@${version}`,
      type: 'json',
      headers: {
        'User-Agent': `yarn website; ${navigator.userAgent}`,
      },
    }).then(res =>
      this.setState({
        bundlesize: {
          href: `https://bundlephobia.com/result?p=${name}@${version}`,
          size: bytes(res.size),
          gzip: bytes(res.gzip),
        },
      })
    );
  }

  maybeRenderReadme() {
    if (this.state.loaded) {
      const { readme = '' } = this.state;
      if (readme.length === 0 || readme === readmeErrorMessage) {
        return <div>{window.i18n.detail.no_readme_found}</div>;
      }
      return (
        <ReadMore
          text={window.i18n.detail.display_full_readme}
          className="details-doc--content"
        >
          <Markdown
            source={this.state.readme}
            githubRepo={this.state.githubRepo}
          />
        </ReadMore>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.state.isBrowsingFiles) {
      return this._renderFileBrowser();
    }
    if (this.state.objectDoesntExist) {
      return this._renderInvalidPackage();
    }
    return this._renderDetails();
  }

  _renderInvalidPackage() {
    return (
      <section className="text-center d-flex flex-column">
        <h2 className="details-main--title d-inline-block m-2">
          {window.i18n.detail.not_found.whoa.replace(
            '{package_name}',
            this.props.objectID
          )}
        </h2>
        <p>{window.i18n.detail.not_found.yours}</p>
        <div className="text-left mx-auto">
          <Copyable pre="$ ">mkdir {this.props.objectID}</Copyable>
          <Copyable pre="$ ">cd {this.props.objectID}</Copyable>
          <Copyable pre="$ ">yarn init</Copyable>
          <p className="text-center">{window.i18n.detail.not_found.make}</p>
          <Copyable pre="$ ">yarn publish</Copyable>
        </div>
      </section>
    );
  }

  _renderDetails() {
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
            deprecated={this.state.deprecated}
            keywords={this.state.keywords}
            version={this.state.version}
          />
          <section id="readme" className="details-doc">
            <h3 className="details-doc--title details-doc--title__readme py-1">
              <a href="#readme">{window.i18n.detail.readme}</a>
            </h3>
            {this.maybeRenderReadme()}
          </section>
          {this.state.changelog && (
            <section id="changelog" className="details-doc">
              <h3 className="details-doc--title details-doc--title__changelog py-1">
                <a href="#changelog">{window.i18n.detail.changelog}</a>
              </h3>
              <ReadMore
                text={window.i18n.detail.display_full_changelog}
                className="details-doc--content"
              >
                <Markdown
                  source={this.state.changelog}
                  githubRepo={this.state.githubRepo}
                />
              </ReadMore>
            </section>
          )}
        </section>

        {this._renderSidebar()}

        <JSONLDItem
          name={this.state.name}
          description={this.state.description}
          keywords={this.state.keywords}
        />
      </div>
    );
  }

  _renderSidebar() {
    return (
      <Aside
        name={this.state.name}
        githubRepo={this.state.githubRepo}
        homepage={this.state.homepage}
        contributors={this.state.owners}
        activity={this.state.activity}
        downloads={this.state.downloadsLast30Days}
        humanDownloads={this.state.humanDownloadsLast30Days}
        dependencies={this.state.dependencies}
        devDependencies={this.state.devDependencies}
        dependents={this.state.dependents}
        humanDependents={this.state.humanDependents}
        stargazers={this.state.github ? this.state.github.stargazers_count : 0}
        versions={this.state.versions}
        version={this.state.version}
        tags={this.state.tags}
        bundlesize={this.state.bundlesize}
        onOpenFileBrowser={this._openFileBrowser}
      />
    );
  }

  _renderFileBrowser() {
    return (
      <div className="details row">
        <section className="details-main col-lg-8">
          <FileBrowser
            objectID={this.props.objectID}
            version={this.state.version}
            onBackToDetails={this._closeFileBrowser}
          />
        </section>
        {this._renderSidebar()}
      </div>
    );
  }

  _openFileBrowser = evt => {
    this.setState({ isBrowsingFiles: true });
    evt.preventDefault();
  };

  _closeFileBrowser = evt => {
    this.setState({ isBrowsingFiles: false });
    evt.preventDefault();
  };
}

export default Details;
