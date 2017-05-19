import React from 'react';

const images = {
  default: '/assets/detail/ico-copy-default.svg',
  success: '/assets/detail/ico-copy-success.svg',
};

export default class Copyable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusImage: images.default,
    };
  }

  copy(toCopy, timeout = 2000) {
    const setAndUnset = ({ image, timeout }) => {
      this.setState(() => ({
        statusImage: image,
      }));
      setTimeout(() => {
        this.setState(() => ({
          statusImage: images.default,
        }));
      }, timeout);
    };

    let range = document.createRange();
    range.selectNode(toCopy);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    try {
      // Now that we've selected the anchor text, execute the copy command
      const copy = document.execCommand('copy');
      window.getSelection().removeAllRanges();
      if (copy === true) {
        setAndUnset({ image: images.success, timeout });
      }
    } catch (err) {
      this.setState(() => ({
        statusImage: images.default,
      }));
    }
  }

  render() {
    return (
      <div className="copyable">
        <code className="copyable--code">
          {this.props.pre}
          <span ref={sample => (this.installSample = sample)}>
            {this.props.text}
          </span>
        </code>
        <button
          onClick={() => this.copy(this.installSample)}
          className="copyable--button"
        >
          <img
            src={this.state.statusImage}
            alt=""
            className="copyable--button__img"
          />
          copy
        </button>
      </div>
    );
  }
}
