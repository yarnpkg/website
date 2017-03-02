import React from 'react';
import algoliasearch from 'algoliasearch';

import { License, Owner, Downloads } from '../Hit';
import { Keywords, encode, packageLink } from '../util';
import schema from '../schema';

const client = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e');
const index = client.initIndex('npm-search');

const images = {
  homepage: '/assets/search/ico-home.svg',
  npm: '/assets/search/ico-npm.svg',
  github: '/assets/search/ico-github.svg',
};

const Link = ({ site, url, display }) => (
  <a href={url} className={`detail-links--link detail-links--link__${site}`}>
    <img src={images[site]} alt="" />
    {display}
  </a>
);

const Links = ({ name, homepage, githubRepo, className }) => (
  <div className="detail-links">
    {homepage
      ? <Link
          site="homepage"
          url={homepage}
          display={homepage.replace(/(http)?s?(:\/\/)?(www)?/, '')}
        />
      : null}
    {githubRepo
      ? <Link
          site="github"
          url={
            `https://github.com/${encode(githubRepo.user)}/${encode(
              githubRepo.project,
            )}${githubRepo.path}`
          }
          display={`${githubRepo.user}/${githubRepo.project}`}
        />
      : null}
    <Link
      site="npm"
      url={`https://www.npmjs.com/package/${name}`}
      display={name}
    />
  </div>
);

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...schema,
    };
  }

  componentWillMount() {
    index
      .getObject(this.props.objectID)
      .then(content => {
        this.setState(content);
        document.title = `${this.props.objectID} | Yarn`;
      })
      .catch(error => alert(error) /*location.href = '/package-not-found'*/);
  }

  render() {
    return (
      <div className="details row">
        <section className="details-main col-lg-8">
          <header className="details-main--header">
            <h2 className="details-main--title">{this.state.name}</h2>
            <Owner className="details-main--owner" {...this.state.owner} />
            <Downloads
              className="details-main--downloads"
              downloads={this.state.downloadsLast30Days}
              humanDownloads={this.state.humanDownloadsLast30Days}
            />
            <License
              className="details-main--license"
              type={this.state.license}
            />
            <Keywords
              className="details-main--keywords"
              keywords={this.state.keywords}
            />
          </header>
          <pre>
            {JSON.stringify(this.state, null, '  ')}
          </pre>
        </section>

        <aside className="details-side col-lg-4">
          <Links
            className="details-side--links"
            name={this.state.name}
            homepage={this.state.homepage}
            githubRepo={this.state.githubRepo}
          />
          <div className="details-side--copy">
            <code>
              {`$ yarn add ${this.state.name}`}
            </code>
            <a
              href={`https://runkit.com/npm/${this.state.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              R
            </a>
          </div>
          <article className="details-side--popularity">
            <h1>Popularity</h1>
          </article>
          <article className="details-side--activity">
            <h1>Activity</h1>
          </article>
          <article className="details-side--contributors">
            <h1>Contributors</h1>
          </article>
        </aside>

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'SoftwareApplication',
            name: this.state.name,
            description: this.state.description,
            url: packageLink(this.state.name),
            keywords: this.state.keywords.join(','),
            applicationCategory: 'DeveloperApplication',
            offers: {
              '@type': 'Offer',
              price: '0.00',
            },
          })}
        </script>
      </div>
    );
  }
}

export default Details;
