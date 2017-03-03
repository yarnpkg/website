import React from 'react';
import { packageLink } from '../util';

const JSONLDItem = ({ name, description, keywords }) => (
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'SoftwareApplication',
      name: name,
      description: description,
      url: packageLink(name),
      keywords: keywords.join(','),
      applicationCategory: 'DeveloperApplication',
      offers: {
        '@type': 'Offer',
        price: '0.00',
      },
    })}
  </script>
);

export default JSONLDItem;
