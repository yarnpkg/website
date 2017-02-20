import React from 'react';
import algoliasearch from 'algoliasearch';

import schema from '../schema.js';

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
    index
      .getObject(this.props.objectID)
      .then(content => {
        this.setState(content);
      })
      .catch(error => location.href = '/package-not-found');
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <pre>
          {JSON.stringify(this.state, null, '  ')}
        </pre>
      </div>
    );
  }
}

export default Details;
