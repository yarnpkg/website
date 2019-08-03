import React from 'react';
import { getDownloadBucket } from '../util';

export const Downloads = ({ downloads = 0, humanDownloads }) => (
  <span
    className={`ais-Hit-popular ${getDownloadBucket(downloads)}`}
    title={window.i18n.downloads_in_last_30_days.replace(
      '{count}',
      downloads.toLocaleString(window.i18n.active_language)
    )}
  >
    {humanDownloads}
  </span>
);
