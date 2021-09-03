
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



        <div >

          {user ? "" :
            <div className="signed_out">
              <NavLink to='/login' exact={true} activeClassName="active">
                <div className="login_navbar">
                  Login
                </div>
              </NavLink>
              <NavLink to='/sign-up' exact={true} activeClassName="active">
                <div className="signup_navbar">
                  Sign Up
                </div>
              </NavLink>
            </div>
          }

          {user ?
            <div className="right_navbar">
              <NavLink activeClassName="active" to="/new-event">
                <div className="upload_button">
                  Upload
                </div>
              </NavLink>

              <NavLink to="/profile" >
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
