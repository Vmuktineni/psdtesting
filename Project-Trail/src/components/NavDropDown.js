import React, { useState } from 'react';
import '../CSS/Dashboard.css';
import { FaBars, FaHome, FaUser } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdHelpCircle ,IoMdLogOut, IoMdSettings} from 'react-icons/io';
import { Link } from 'react-router-dom';

const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <FaHome />,
    cName: 'nav-text',
  },

  {
    title: 'Support',
    path: '/support',
    icon: <IoMdHelpCircle />,
    cName: 'nav-text',
  },

  {
    title: 'Profile', 
    path: '/profile', 
    icon: <FaUser />, 
    cName: 'nav-text',
  },

  {
    title: 'Settings',
    path: '/settings',
    icon: <IoMdSettings />,
    cName: 'nav-text',
  },
  
  {
    title: 'Logout',
    path: '/logout', 
    icon: <IoMdLogOut />, 
    cName: 'nav-text',
  },
];

function Dashboard() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className={`dashboard ${sidebar ? 'active' : ''}`}>
      <div className='navbar'>
        <button onClick={showSidebar} className='menu-bars'>
          <FaBars onClick={showSidebar} />
        </button>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <button className='menu-bars'>
              <AiOutlineClose />
            </button>
          </li>
          {SidebarData.map((item, index) => (
            <React.Fragment>
              {SidebarData.length - 2 === index - 1 && <hr />}
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;



