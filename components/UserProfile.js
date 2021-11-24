import React from "react";

const UserProfile = ({ user }) => {
  console.log(user);
  return (
    <div>
      <p>{user.username}</p>
      <p>{user.displayName}</p>
    </div>
  );
};

export default UserProfile;
