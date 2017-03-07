import React from 'react';

class ReadMore extends React.Component {
  constructor(props) {
    super(props);

    this.maxHeight = '250px';
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, text } = this.props;
    const { collapsed } = this.state;

    return (
      <div className={`readMore ${collapsed ? 'readMore--collapsed' : ''}`}>
        <div
          className="readMore--content"
          style={{ maxHeight: collapsed ? this.maxHeight : '' }}
        >
          {children}
        </div>
        <button className="readMore--button" onClick={this.toggleCollapse}>
          {collapsed ? text : window.i18n.collapse}
          <img
            src="/assets/search/ico-readmore.svg"
            alt=""
            className="readMore--icon"
            style={{ transform: collapsed ? '' : 'rotate(180deg)' }}
          />
        </button>
      </div>
    );
  }
}

export default ReadMore;
