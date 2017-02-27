import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch';
import { Owner } from './lib/Hit';
import { packageLink, Keywords } from './lib/util';

const FEATURED = ['babel-core', 'react', 'async', 'lodash', 'debug', 'qs'];

const client = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e');
const index = client.initIndex('npm-search');

class FeaturedPackage extends React.Component {
  PropTypes = {
    name: PropTypes.string.isRequired,
    owner: {
      link: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    },
    homepage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { name, owner, homepage, description, keywords } = this.props;
    return (
      <div className="pkg-featured-pkg">
        <Owner {...owner} />
        <a className="ais-Hit--name" href={packageLink(name)}>
          {name}
        </a>
        <p>{description}</p>
        <Keywords keywords={keywords} />
      </div>
    );
  }
}

class Featured extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: [],
    };
  }

  componentWillMount() {
    index.getObjects(this.props.packages).then(content => {
      this.setState({
        featured: content.results,
      });
    });
  }

  render() {
    const { featured } = this.state;
    const half = Math.floor(featured.length / 2);
    const groups = [
      featured.slice(0, half),
      featured.slice(half, featured.length),
    ];
    const hasContent = groups.every(group => group.length > 0);
    return (
      <div className="row">
        {hasContent
          ? groups.map((packages, i) => (
              <div className="col-md-6" key={i}>
                {packages.map(pkg => (
                  <FeaturedPackage {...pkg} key={pkg.objectID} />
                ))}
              </div>
            ))
          : ''}
      </div>
    );
  }
}

ReactDOM.render(
  <Featured packages={FEATURED} />,
  document.getElementById('pkg-featured'),
);
