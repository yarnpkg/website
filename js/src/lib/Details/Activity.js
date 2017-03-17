import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { isEmpty } from '../util';

const commitsLastThreemonths = ({ weeklyData }) =>
  weeklyData.slice(-13).reduce((acc, { total }) => acc + total, 0);

const weeksAgoSinceLastCommit = ({ weeklyData }) =>
  formatWeeksSinceLastCommit(
    weeklyData.reverse().findIndex(({ total }) => total !== 0),
  );

const formatWeeksSinceLastCommit = weeks =>
  weeks === -1
    ? 'over a year ago'
    : `${weeks < 1 ? 'less than a' : weeks} week${weeks > 1 ? 's' : ''} ago`;

const Activity = ({ data = [] }) => !isEmpty(data) &&
<article className="details-side--activity">
  <h1>Activity</h1>
  <Sparklines
    data={data.map(week => week.total)}
    width={100}
    height={15}
    limit={12 /*three months*/}
  >
    <SparklinesLine color="#2C8EBB" />
  </Sparklines>
  <dl>
    <div className="d-flex flex-items-between w-100">
      <img src="/assets/detail/ico-commits.svg" alt="" />
      <dt>Commits last 3 months</dt>
      <span className="dotted flex-grow" />
      <dd>
        {commitsLastThreemonths({ weeklyData: data })}
      </dd>
    </div>
    <div className="d-flex flex-items-between w-100">
      <img src="/assets/detail/ico-commits-last.svg" alt="" />
      <dt>Last commit</dt>
      <span className="dotted flex-grow" />
      <dd>
        {weeksAgoSinceLastCommit({ weeklyData: data })}
      </dd>
    </div>
  </dl>
</article>;

export default Activity;
