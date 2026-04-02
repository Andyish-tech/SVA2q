import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <NavLink to="/" className="logo-text">SVA^2 Devs</NavLink>
        </div>
        <nav className="nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Home
          </NavLink>
          <NavLink 
            to="/form" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Register
          </NavLink>
          <NavLink 
            to="/table" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Students
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
