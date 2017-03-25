import React from 'react';
import { packageLink } from '../util';

const Usage = ({ dependencies }) => (
  <article className="details-side--usage">
    <h1>{window.i18n.detail.usage}</h1>
    <dl>
      {dependencies &&
        <div className="d-flex flex-items-between w-100">
          <img src="/assets/detail/ico-dependencies.svg" alt="" />
          <dt>
            {Object.keys(dependencies).length > 0
              ? <details>
                  <summary>{window.i18n.detail.dependencies}</summary>
                  {Object.keys(dependencies)
                    .map((name, index) => (
                      <a href={packageLink(name)} key={index}>{name}</a>
                    ))
                    .reduce((prev, curr) => [prev, ', ', curr])}
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
