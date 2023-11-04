
import { Link } from 'react-router-dom';
import Logo from './Logo';
import '../CSS/Header.css';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import NavDropDown from './NavDropDown';

function Header() {
  const userFromRedux = useSelector(state => state?.userInfo?.user);

  return (
    <header className="header">
      <div className="dashboard">
        <Logo />
        {userFromRedux && <NavDropDown />}
      </div>
      <nav className="navigation">
        <ul>
        {userFromRedux ? null : ( 
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </>
          )}
        </ul>
      </nav>
      {userFromRedux && (
        <div className="cart-icon">
          <Link to="/cart">
            {}
            <FaShoppingCart size={30} color="white" />
          </Link>
        </div>
      )}

    </header>
  );
}

export default Header;
