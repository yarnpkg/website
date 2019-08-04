import React, { Component } from 'react';
import { RefinementList, Configure } from 'react-instantsearch-dom';

/**
 * This is mostly like ToggleRefinement, but uses "filters" for more flexibility
 * in the values
 */
class ToggleFilter extends Component {
  state = { refinement: undefined };

  setRefinement = e => this.setState({ refinement: e.target.value });

  render() {
    const filters =
      this.state.refinement === undefined ? undefined : this.state.refinement;

    return (
      <div>
        <Configure filters={filters} />
        <ul>
          {this.props.values.map(({ value, label }, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name={this.props.name}
                  value={value}
                  onChange={this.setRefinement}
                  checked={this.state.refinement === value}
                />
                {' ' + label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export const Refinements = ({ sidebarOpen, toggleSidebar, className }) => (
  <aside className={`refinements ${className}`}>
    <button onClick={toggleSidebar}>
      {sidebarOpen ? 'hide' : 'show'} refinements
    </button>
    {sidebarOpen ? (
      <React.Fragment>
        <article>
          <h1>Owner</h1>
          <RefinementList attribute="owner.name" searchable />
        </article>
        <article>
          <h1>Keywords</h1>
          <RefinementList attribute="keywords" searchable />
        </article>
        <article>
          <h1>TypeScript support</h1>
          <RefinementList
            attribute="types.ts"
            transformItems={items =>
              items.map(item => {
                if (item.label === 'false') {
                  item.label = 'unsupported';
                }
                return item;
              })
            }
          />
        </article>
        <article>
          <h1>Deprecated</h1>
          <ToggleFilter
            name="deprecated"
            values={[
              { label: 'all', value: undefined },
              { label: 'not deprecated', value: 'deprecated:false' },
              { label: 'deprecated', value: 'NOT deprecated:false' },
            ]}
          />
        </article>
      </React.Fragment>
    ) : null}
  </aside>
);
