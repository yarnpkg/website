import React from 'react';
import algoliasearch from 'algoliasearch';

import { License, Owner } from '../Hit';
import { Keywords, encode, packageLink } from '../util';
import schema from '../schema';

const client = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e');
const index = client.initIndex('npm-search');

const images = {
  homepage: '/assets/search/ico-home.svg',
  npm: '/assets/search/ico-npm.svg',
  github: '/assets/search/ico-github.svg',
};

const Link = ({ site, url }) => (
  <a href={url} className={`detail-links--link detail-links--link__${site}`}>
    <img src={images[site]} alt="" />
    {url}
  </a>
);

const Links = ({ name, homepage, githubRepo, className }) => (
  <div className="detail-links">
    <Link site="npm" url={`https://www.npmjs.com/package/${name}`} />
    {githubRepo
      ? <Link
          site="github"
          url={
            `https://github.com/${encode(githubRepo.user)}/${encode(
              githubRepo.project,
            )}${githubRepo.path}`
          }
        />
      : null}
    {homepage ? <Link site="homepage" url={homepage} /> : null}
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
      .catch(error => location.href = '/package-not-found');
  }

  render() {
    return (
      <div>
        <h2 className="ais-Hit--name">{this.state.name}</h2>
        <Owner {...this.state.owner} />
        <License type={this.state.license} />
        <Keywords keywords={this.state.keywords} />
        <Links
          name={this.state.name}
          homepage={this.state.homepage}
          githubRepo={this.state.githubRepo}
        />
        <pre>
          {JSON.stringify(this.state, null, '  ')}
        </pre>
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
