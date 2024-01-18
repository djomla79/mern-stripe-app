import { Fragment, useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
// import { PlaceContext } from '../../context/place-context';

import './NavigationBar.css';

const NavigationBar = () => {
  const { isLoggedIn, logout, id: userId } = useContext(AuthContext);
  // const { pid } = useContext(PlaceContext);

  const onLogoutHandler = () => {
    logout();
  };

  return (
    <Fragment>
      <div className='navigation-bar'>
        <div className='logo'>Logo</div>
        <div className='nav-links'>
          <NavLink
            to='/'
            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
          >
            All Places
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to={`/${userId}/places`}
              className={({ isActive }) => `nav-link ${isActive && 'active'}`}
            >
              My Places
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              to='/places/new'
              className={({ isActive }) => `nav-link ${isActive && 'active'}`}
            >
              Add New
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink
              to='/authenticate'
              className={({ isActive }) => `nav-link ${isActive && 'active'}`}
            >
              Login/Signup
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              to='/'
              onClick={onLogoutHandler}
              className={({ isActive }) => `nav-link ${false && 'active'}`}
            >
              Logout
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
