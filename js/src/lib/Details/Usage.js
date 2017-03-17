import React from 'react';

const Usage = ({ dependencies }) => (
  <article className="details-side--usage">
    <h1>Usage</h1>
    <dl>
      {dependencies &&
        <div className="d-flex flex-items-between w-100">
          <img src="/assets/detail/ico-dependencies.svg" alt="" />
          <dt>
            {Object.keys(dependencies).length > 0
              ? <details>
                  <summary>Dependencies</summary>
                  {Object.keys(dependencies).join(', ')}
                </details>
              : 'Dependencies'}
          </dt>
          <span className="dotted flex-grow" />
          <dd>{Object.keys(dependencies).length}</dd>
        </div>}
    </dl>
  </article>
);

export default Usage;
