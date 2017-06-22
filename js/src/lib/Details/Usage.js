import React from 'react';
import { packageLink } from '../util';
import { Di } from './';

const deps = ({ dependencies, title }) => {
  if (dependencies) {
    const dependencyNames = Object.keys(dependencies);

    return {
      title: dependencyNames.length > 0
        ? <details>
            <summary>{title}</summary>
            {dependencyNames
              .map((name, index) =>
                <a
                  href={packageLink(name)}
                  key={index}
                  title={`${name}@${dependencies[name]}`}
                >
                  {name}
                </a>
              )
              .reduce((prev, curr) => [prev, ', ', curr])}
          </details>
        : title,
      description: dependencyNames.length,
    };
  }
  return {};
};

const Usage = ({ dependencies, devDependencies, packageJSONLink, versions }) =>
  <article className="details-side--usage">
    <h1>{window.i18n.detail.usage}</h1>
    <dl>
      <Di
        icon="dependencies"
        {...deps({
          title: window.i18n.detail.dependencies,
          dependencies: dependencies,
        })}
      />
      <Di
        icon="devdependencies"
        {...deps({
          title: window.i18n.detail.devdependencies,
          dependencies: devDependencies,
        })}
      />
      {packageJSONLink &&
        <Di
          icon="package-json"
          title={window.i18n.detail.packages}
          description={
            <a target="_blank" rel="noopener noreferrer" href={packageJSONLink}>
              {window.i18n.detail.see_package_json}
            </a>
          }
        />}
    </dl>
  </article>;

export default Usage;
