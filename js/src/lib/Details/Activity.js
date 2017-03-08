import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const Activity = ({ data = [] }) => (
  <article className="details-side--activity">
    <h1>Activity</h1>
    <Sparklines data={data.map(week => week.total)} width={100} height={20}>
      <SparklinesLine color="#2C8EBB" />
    </Sparklines>
  </article>
);

export default Activity;
