import React, { Component, PropTypes } from 'react';
import SearchBox from 'react-instantsearch/src/widgets/SearchBox';

class WrappedSearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  render() {
    return (
      <div className={this.state.active ? 'active' : ''}>
        <SearchBox
          onFocus={() => {
            this.setState({
              active: true,
            });
          }}
          onBlur={() => {
            this.setState({
              active: false,
            });
          }}
          {...this.props}
        />
      </div>
    );
  }
}

export default WrappedSearchBox;
