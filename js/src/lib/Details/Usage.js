import React from 'react';
import { packageLink } from '../util';

const Deps = ({ dependencies, text, id }) => {
  if (dependencies) {
    const dependencyNames = Object.keys(dependencies);
    return (
      <div className="d-flex flex-items-between w-100">
        <img src={`/assets/detail/ico-${id}.svg`} alt="" />
        <dt>
          {dependencyNames.length > 0
            ? <details>
                <summary>{text}</summary>
                {dependencyNames
                  .map((name, index) => (
                    <a href={packageLink(name)} key={index}>{name}</a>
                  ))
                  .reduce((prev, curr) => [prev, ', ', curr])}
              </details>
            : text}
        </dt>
        <span className="dotted flex-grow" />
        <dd>{dependencyNames.length}</dd>
      </div>
    );
  }
  return null;
};

const Usage = ({
  dependencies,
  devDependencies,
  packageJSONLink,
  versions,
}) => (
  <article className="details-side--usage">
    <h1>{window.i18n.detail.usage}</h1>
    <dl>
      <Deps
        dependencies={dependencies}
        text={window.i18n.detail.dependencies}
        id="dependencies"
      />
      <Deps
        dependencies={devDependencies}
        text={window.i18n.detail.devdependencies}
        id="devdependencies"
      />
      {packageJSONLink &&
        <div className="d-flex flex-items-between w-100">
          <img src="/assets/detail/ico-package-json.svg" alt="" />
          <dt>{window.i18n.detail.packages}</dt>
          <span className="dotted flex-grow" />
          <dd>
            <a href={packageJSONLink}>{window.i18n.detail.see_package_json}</a>
          </dd>
        </div>}
    </dl>
  </article>
);

export default Usage;
