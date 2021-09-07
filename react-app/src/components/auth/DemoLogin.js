import React from 'react';
import { useDispatch } from 'react-redux';
import { loginDemo } from '../../store/session';
import { useHistory } from "react-router-dom";


const DemoLogin = () => {
  const history = useHistory()
  const dispatch = useDispatch()


  const onDemoLogin = async (e) => {
    await dispatch(loginDemo());
    history.push("/")
  };


  return (
    <button onClick={onDemoLogin} className="demo-button" >
      Demo Login
    </button>
  );
};

export default DemoLogin;
