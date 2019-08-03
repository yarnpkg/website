import React from 'react';

export const Di = ({ icon, title, description }) => (
  <div className="d-flex justify-items-between w-100">
    {icon && <img src={`/assets/detail/ico-${icon}.svg`} alt="" />}
    <dt>{title}</dt>
    <span className="dotted flex-grow" />
    <dd>{description}</dd>
  </div>
);
