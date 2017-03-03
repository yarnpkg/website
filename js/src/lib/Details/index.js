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
  <a href={url} className={`details-links--link details-links--link__${site}`}>
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

const JSONLDItem = ({ name, description, keywords }) => (
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'SoftwareApplication',
      name: name,
      description: description,
      url: packageLink(name),
      keywords: keywords.join(','),
      applicationCategory: 'DeveloperApplication',
      offers: {
        '@type': 'Offer',
        price: '0.00',
      },
    })}
  </script>
);

const Header = (
  {
    name,
    owner,
    downloadsLast30Days,
    humanDownloadsLast30Days,
    license,
    keywords,
  },
) => (
  <header className="details-main--header">
    <h2 className="details-main--title d-inline-block m-2">
      {name}
    </h2>
    <div className="details-main--info d-inline-block m-2">
      <Owner {...owner} />
      <Downloads
        downloads={downloadsLast30Days}
        humanDownloads={humanDownloadsLast30Days}
      />
      <License type={license} />
      <Keywords keywords={keywords} />
    </div>
  </header>
);

const Aside = ({ name, homepage, githubRepo, contributors }) => (
  <aside className="details-side col-lg-4">
    <article className="details-side--links">
      <Links name={name} homepage={homepage} githubRepo={githubRepo} />
    </article>
    <article className="details-side--copy">
      <h1>Use it</h1>
      <code>
        {`$ yarn add ${name}`}
      </code>
      <a
        className="details-side--runkit"
        href={`https://runkit.com/npm/${name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Try in RunKit
      </a>
    </article>
    <article className="details-side--popularity">
      <h1>Popularity</h1>
    </article>
    <article className="details-side--activity">
      <h1>Activity</h1>
    </article>
    <article className="details-side--contributors">
      <h1>Contributors</h1>
      <ul className="list-unstyled m-2">
        {contributors.map(contributor => (
          <li className="mb-1"><Owner {...contributor} /></li>
        ))}
      </ul>
    </article>
  </aside>
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
          <Header
            name={this.state.name}
            owner={this.state.owner}
            downloadsLast30Days={this.state.downloadsLast30Days}
            humanDownloadsLast30Days={this.state.humanDownloadsLast30Days}
            license={this.state.license}
            keywords={this.state.keywords}
          />
          <pre>
            {JSON.stringify(this.state, null, '  ')}
          </pre>
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
