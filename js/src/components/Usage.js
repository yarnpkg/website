import React from 'react';

import { packageLink } from '../util';
import { Di } from './';

const deps = ({ dependencies, title }) => {
  if (dependencies) {
    const dependencyNames = Object.keys(dependencies);

    return {
      title:
        dependencyNames.length > 0 ? (
          <details>
            <summary>{title}</summary>
            {dependencyNames
              .map((name, index) => (
                <a
                  href={packageLink(name)}
                  key={index}
                  title={`${name}@${dependencies[name]}`}
                >
                  {name}
                </a>
              ))
              .reduce((prev, curr) => [prev, ', ', curr])}
          </details>
        ) : (
          title
        ),
      description: dependencyNames.length,
    };
  }
  return {};
};

export const Usage = ({
  dependencies,
  devDependencies,
  versions,
  bundlesize,
  packageJSONLink,
}) => (
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
      {packageJSONLink && (
        <Di
          icon="package-json"
          title={window.i18n.detail.packages}
          description={
            <a target="_blank" rel="noopener noreferrer" href={packageJSONLink}>
              {window.i18n.detail.see_package_json}
            </a>
          }
        />
      )}
      {bundlesize && (
        <Di
          icon="download-size"
          title={window.i18n.detail.bundlesize}
          description={
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={bundlesize.href}
              title={window.i18n.detail.bundlesize_text
                .replace('{size}', bundlesize.size)
                .replace('{gzip}', bundlesize.gzip)}
            >
              {bundlesize.size}
            </a>
          }
        />
      )}
    </dl>
  </article>
);
