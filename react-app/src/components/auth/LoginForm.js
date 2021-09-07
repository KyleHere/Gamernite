import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';

import DemoLogin from './DemoLogin';
import './Login-Signup.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className="login_container">
        <h2 className="form_title">Login</h2>
        <form className="login_form" onSubmit={onLogin}>
          <div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
          </div>


          <div className="input">
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='input'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button className="login_button" type='submit'>Login</button>
          </div>
          <div>
            <span>Don't have an account?</span>
            <NavLink className="signup_button" to="/sign-up">
              Sign up
            </NavLink>
          </div>
        </form>
      </div>
      <div className="divider__container">
        <div className="divider">
          <strong className="divider-title">OR</strong>
        </div>
      </div>
      <div className="demo-login__container">
        <DemoLogin />
      </div>
    </>
  );
};

export default LoginForm;
