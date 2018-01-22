import React from 'react';
import { Sparklines, SparklinesLine } from '@haroenv/react-sparklines';
import { isEmpty, encode } from '../util';
import { Di } from './';

const Activity = ({
  graphData,
  graphLink,
  lastCommit,
  commitsLastThreeMonths,
}) => {
  if (!graphData && !graphLink && !lastCommit && !commitsLastThreeMonths) {
    return null;
  }

  return (
    <article className="details-side--activity">
      <h1>{window.i18n.detail.activity}</h1>

      {graphData && (
        <a href={graphLink} target="_blank" rel="noopener noreferrer">
          <Sparklines data={graphData} width={100} height={15}>
            <SparklinesLine color="#2C8EBB" />
          </Sparklines>
        </a>
      )}
      <dl>
        {commitsLastThreeMonths && (
          <Di
            icon="commits"
            title={window.i18n.detail.commits_last_three_months}
            description={commitsLastThreeMonths}
          />
        )}
        {lastCommit && (
          <Di
            icon="commits-last"
            title={window.i18n.detail.last_commit}
            description={lastCommit}
          />
        )}
      </dl>
    </article>
  );
};

export default Activity;
