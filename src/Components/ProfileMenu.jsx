import React from 'react';
import "../App.css"
const ProfileMenu = ({ visible }) => {
  return (
    <div className={`profile-menu ${visible ? 'active' : ''}`}>
      <div>
        <h3>My Account</h3>
        <ul>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">My Courses</a></li>
          <li><a href="#">Subscriptions</a></li>
          <li><a href="#">Help & Support</a></li>
        </ul>
      </div>
      <div>
        <ul>
          <li><a href="#">Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
