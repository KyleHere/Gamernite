import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import DemoLogin from './DemoLogin';
import './Login-Signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (username === "") {
      setErrors(["Please enter a username"])
    }
    else if (email === "") {
      setErrors(["Please enter a valid email"])
    }
    else if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else if (password !== repeatPassword) {
      setErrors(["Passwords do not match"])
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className="login_container">
        <h1>Sign Up</h1>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="input">
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder="Username"
            ></input>
          </div>
          <div className="input">
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder="Email"
            ></input>
          </div>
          <div className="input">
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder="Password"
            ></input>
          </div>
          <div className="input">
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder="Confirm Password"
            // required={true}
            ></input>
          </div>
          <div className="signup_button_div">
            <button className="signup_button" type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
      <div className="divider__container">
        <div className="divider">
          <strong className="divider-title">OR</strong>
        </div>
        <div className="demo-login__container">
          <DemoLogin />
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
