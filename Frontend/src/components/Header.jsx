import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky-header">
      <nav className="container nav-bar">
        <div className="logo">
          <NavLink to="/">Antigravity Devs</NavLink>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/form" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/table" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Students
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
