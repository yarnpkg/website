import { isEmpty, encode } from '../util';
import Activity from './Activity';

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
    weeklyData
      .slice()
      .reverse()
      .findIndex(({ total }) => total !== 0)
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

const GithubActivity = ({ data = [], repository }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <Activity
      lastCommit={weeksAgoSinceLastCommit({ weeklyData: data })}
      commitsLastThreeMonths={countCommitsLastThreeMonths({ weeklyData: data })}
      graphData={commitsPerWeekLastThreeMonths({ weeklyData: data })}
      graphLink={`https://github.com/${encode(repository.user)}/${encode(
        repository.project
      )}/graphs/commit-activity`}
    />
  );
};

export default GithubActivity;
