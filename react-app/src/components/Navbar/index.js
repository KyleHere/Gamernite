
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './Navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <div className='navbar_container'>
      <NavLink to='/' exact={true} activeClassName='active'>
        Home
      </NavLink>
      {user ? "" :
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          {/* <button to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </button> */}
        </div>
      }
      {user ?
        <div>
          <NavLink to="/new-event">Upload</NavLink>
          <LogoutButton />
        </div>
        : ""}
    </div>
  );
}

export default NavBar;
