import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch';

import schema from './lib/schema.js';

const client = algoliasearch('OFCNCOG2CU', 'f54e21fa3a2a0160595bb058179bfb1e');
const index = client.initIndex('npm-search');

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...schema,
      objectID: location.search.substring(1),
    };
  }

  componentWillMount() {
    index
      .getObject(this.state.objectID)
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

ReactDOM.render(<Details />, document.getElementById('pkg-detail'));
