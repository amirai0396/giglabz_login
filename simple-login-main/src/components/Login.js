import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions';
import { useHistory, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      history.push('/dashboard');
    }
  }, [userData, history]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.username === '' || user.password === '') {
      setError('All fields are required');
    } else {
      dispatch(loginUser(user));
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>Login</h2>
        <input
          type='text'
          name='username'
          value={user.username}
          onChange={handleChange}
          placeholder='Username'
          className='login-input'
        />
        <input
          type='password'
          name='password'
          value={user.password}
          onChange={handleChange}
          placeholder='Password'
          className='login-input'
        />
        {error && <p className='login-error'>{error}</p>}
        <button type='submit' className='login-button'>
          Login
        </button>
      </form>
      <p className='not-a-user'>
        Not a user? <Link to='/signup'>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
