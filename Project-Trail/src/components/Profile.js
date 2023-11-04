import React, { useState } from 'react';
import '../CSS/Profile.css';

const Profile = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <div className={`profile ${isProfileOpen ? 'profile-open' : ''}`}>
      <button className="profile-button" onClick={toggleProfile}>
        Profile
      </button>
      {isProfileOpen && (
        <div className="profile-content">
          {}
        </div>
      )}
    </div>
  );
};

export default Profile;