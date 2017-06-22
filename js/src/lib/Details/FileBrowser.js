import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import React from 'react';

import fetch from 'unfetch';

import bytes from 'bytes';

const SORT_ORDER = { directory: 1, file: 2 };

function getBasename(path) {
  return path.substr(path.lastIndexOf('/') + 1);
}

export default class FileBrowser extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      expandedDirs: {
        '/': true,
      },
    };
  }

  componentWillMount() {
    this._fetchFiles();
  }

  componentDidMount() {
    if (this._backRef) {
      this._backRef.focus();
    }
  }

  _fetchFiles() {
    this.setState({ error: null, files: null });
    const url = this._getBaseURL() + '?json';
    fetch(url)
      .then(response => response.json())
      .then(
        files => this.setState({ files }),
        error => this.setState({ error })
      );
  }

  render() {
    return (
      <div>
        <h2 className="m-2">
          {window.i18n.detail.files_header.replace(
            '{name}',
            this.props.objectID
          )}
        </h2>
        <a href="#" ref={this._setBackRef} onClick={this.props.onBackToDetails}>
          ← {window.i18n.detail.back_to_details}
        </a>
        {this._renderInner()}
      </div>
    );
  }

  _renderInner() {
    if (this.state.files) {
      return (
        <Directory
          baseURL={this._getBaseURL()}
          dir={this.state.files}
          expandedDirs={this.state.expandedDirs}
          onToggleDir={this._toggleDir}
        />
      );
    }
    if (this.state.error) {
      return (
        <div className="alert alert-danger" role="alert">
          {window.i18n.detail.files_error.replace(
            '{error}',
            this.state.error.message
          )}
        </div>
      );
    }
    return (
      <div>
        {window.i18n.detail.loading}
      </div>
    );
  }

  _getBaseURL() {
    return `https://unpkg.com/${this.props.objectID}@${this.props.version}/`;
  }

  _toggleDir = dir => {
    const shouldBeExpanded = !this.state.expandedDirs[dir.path];
    this.setState({
      expandedDirs: {
        ...this.state.expandedDirs,
        [dir.path]: shouldBeExpanded,
      },
    });
  };

  _setBackRef = ref => {
    this._backRef = ref;
  };
}

class Directory extends React.PureComponent {
  render() {
    const dir = this.props.dir;
    const url = this.props.baseURL + dir.path.substr(1) + '/';
    if (dir.path === '/') {
      // Special case for root - Only render the contents, not the outer
      // wrapper.
      return this._renderDirContents();
    }
    return (
      <li key={dir.path}>
        <a
          className="details-files__dirname"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={this._toggleDir}
        >
          {getBasename(dir.path)}
        </a>
        <CSSTransitionGroup
          transitionName="details-files"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}
        >
          {this._renderDirContents()}
        </CSSTransitionGroup>
      </li>
    );
  }

  _renderDirContents() {
    if (!this.props.expandedDirs[this.props.dir.path]) {
      return null;
    }
    const files = this.props.dir.files;

    files.sort((a, b) => {
      // Sort by type (directories to the top)
      if (a.type !== b.type) {
        return SORT_ORDER[a.type] - SORT_ORDER[b.type];
      }
      // Then sort by filename, case insensitive
      return a.path.localeCompare(b.path, 'en', { sensitivity: 'base' });
    });

    return (
      <ul className="details-files__list">
        {files.map(file => {
          if (file.type === 'directory') {
            return (
              <Directory
                baseURL={this.props.baseURL}
                dir={file}
                expandedDirs={this.props.expandedDirs}
                key={file.path}
                onToggleDir={this.props.onToggleDir}
              />
            );
          } else {
            return (
              <File
                file={file}
                key={file.path}
                url={this.props.baseURL + file.path.substr(1)}
                size={file.size}
              />
            );
          }
        })}
      </ul>
    );
  }

  _toggleDir = evt => {
    this.props.onToggleDir(this.props.dir);
    evt.preventDefault();
  };
}

const File = ({ file, url, size }) =>
  <li
    key={file.path}
    className="d-flex justify-items-between align-items-baseline"
  >
    <a className="details-files__filename" href={url} target="_blank">
      {getBasename(file.path)}
    </a>
    <small>{bytes(size)}</small>
  </li>;
