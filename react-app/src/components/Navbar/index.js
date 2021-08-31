
import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './Navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <div className="entire_navbar">
      <div className='navbar_container'>
        <div className="left_navbar">
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className="logo_img" src="https://i.imgur.com/eo82st8.png" />
          </NavLink>
        </div>
        <div></div>
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
        <div >
          {user ?
            <div className="right_navbar">
              <NavLink className="upload_link" to="/new-event">Upload</NavLink>

              <NavLink to="/profile">
                {/* Try to implement a dropdown for the profile logo */}
                <img className="profile_img" src="https://i.imgur.com/72dKGdN.png" />
              </NavLink>

              <LogoutButton />
            </div>
            : ""}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
