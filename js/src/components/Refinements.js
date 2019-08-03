import React from 'react';
import { RefinementList, Panel } from 'react-instantsearch-dom';

export const Refinements = ({ sidebarOpen, toggleSidebar, className }) => (
  <aside className={`refinements ${className}`}>
    <button onClick={toggleSidebar}>
      {sidebarOpen ? 'hide' : 'show'} refinements
    </button>
    {sidebarOpen ? (
      <React.Fragment>
        <Panel>
          <h1>Owner</h1>
          <RefinementList attribute="owner.name" searchable />
        </Panel>
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
          <RefinementList attribute="deprecated" />
        </article>
      </React.Fragment>
    ) : null}
  </aside>
);
