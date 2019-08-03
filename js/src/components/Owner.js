import React from 'react';

export const Owner = ({ link, avatar, name, onClick }) => (
  <a
    className="ais-Hit-ownerLink"
    href={link}
    onClick={e => {
      if (onClick && !(e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClick(name);
      }
    }}
  >
    <img
      width="20"
      height="20"
      className="ais-Hit-ownerAvatar"
      src={`https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/${avatar}`}
    />
    {name}
  </a>
);
