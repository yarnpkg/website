import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { isEmpty, encode } from '../util';
import { Di } from './';

const threeMonths = 12; // 4 weeks * 3 = 12

const commitsLastThreeMonths = ({ weeklyData }) =>
  weeklyData.slice(-(threeMonths + 1));

const countCommitsLastThreeMonths = ({ weeklyData }) =>
  commitsLastThreeMonths({ weeklyData }).reduce(
    (acc, { total }) => acc + total,
    0
  );

const commitsPerWeekLastThreeMonths = ({ weeklyData }) =>
  commitsLastThreeMonths({ weeklyData }).map(week => week.total);

const weeksAgoSinceLastCommit = ({ weeklyData }) =>
  formatWeeksSinceLastCommit(
    weeklyData.slice().reverse().findIndex(({ total }) => total !== 0)
  );

const formatWeeksSinceLastCommit = weeks => {
  if (weeks === -1) {
    return window.i18n.detail.over_a_year_ago;
  }
  if (weeks < 1) {
    return window.i18n.detail.less_than_a_week_ago;
  }
  if (weeks === 1) {
    return window.i18n.detail.one_week_ago;
  }
  return window.i18n.detail.weeks_ago.replace('{count}', weeks);
};

const Activity = ({ data = [], githubRepo }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <article className="details-side--activity">
      <h1>{window.i18n.detail.activity}</h1>
      <a
        href={`https://github.com/${encode(githubRepo.user)}/${encode(
          githubRepo.project
        )}/graphs/commit-activity`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Sparklines
          data={commitsPerWeekLastThreeMonths({ weeklyData: data })}
          width={100}
          height={15}
        >
          <SparklinesLine color="#2C8EBB" />
        </Sparklines>
      </a>
      <dl>
        <Di
          icon="commits"
          title={window.i18n.detail.commits_last_three_months}
          description={countCommitsLastThreeMonths({ weeklyData: data })}
        />
        <Di
          icon="commits-last"
          title={window.i18n.detail.last_commit}
          description={weeksAgoSinceLastCommit({ weeklyData: data })}
        />
      </dl>
    </article>
  );
};

export default Activity;
