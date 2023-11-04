import React from 'react';
import logoImage from '../Logos/mechazonelogo.png'; 
import '../CSS/Logo.css';

function Logo() {
  return (
    <div className="logo">
      <img src={logoImage} alt="MECHAZONE Logo" />
    </div>
  );
}

export default Logo;