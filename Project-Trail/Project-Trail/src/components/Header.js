import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Logo from './Logo'; // Import the Logo component
import '../CSS/Header.css';
import NavDropDown from "./NavDropDown";
import { useSelector } from 'react-redux';

function Header() {
  const userFromRedux = useSelector(state => state?.userInfo?.user);
  return (
    <header className="header">
      <div className="dashboard">
        <Logo /> {/* Add the Logo component */}
        <NavDropDown user = {userFromRedux} />
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
