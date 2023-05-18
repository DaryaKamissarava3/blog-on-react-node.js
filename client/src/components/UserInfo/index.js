import React from 'react';
import './UserInfo.css';

export const UserInfo = ({avatarUrl,fullName }) => {
  return (
    <div className="root">
      <img className="avatar" src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className="styles.userDetails">
        <span className="userName">{fullName}</span>
      </div>
    </div>
  );
};
