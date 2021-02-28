import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SignIn } from '../../store/modules/auth/auth.action';
import Logo from '../../assets/logo_v3.png';

const Login = () => {
  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const userLogin = (credentials) => dispatch(SignIn(credentials));

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const submitUser = (e) => {
    e.preventDefault();
    userLogin({
      email: user.email,
      password: user.password,
    });
  };

  if (currentState.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-card'>
      <div className='image-section'>
        <img src={Logo}></img>
      </div>
      <form className='custom-form' onSubmit={submitUser}>
        <div className='custom-form-group mb-3'>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <div className='custom-form-group mb-3'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <button
          className='button button__green button__large mt-4 w-100 p-2'
          type='submit'
          disabled={user.email === '' || user.password === ''}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
