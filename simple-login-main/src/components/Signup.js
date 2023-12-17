import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'; 
import { signupUser } from '../actions';
import './Signup.css';

const Signup = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.username === '' || user.password === '') {
      setError('All fields are required');
    } else {
      dispatch(signupUser(user, history));
    }
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit} className='signup-form'>
        <h2>Signup</h2>
        <input
          type='text'
          name='username'
          value={user.username}
          onChange={handleChange}
          placeholder='Username'
          className='signup-input'
        />
        <input
          type='password'
          name='password'
          value={user.password}
          onChange={handleChange}
          placeholder='Password'
          className='signup-input'
        />
        {error && <p className='signup-error'>{error}</p>}
        <button type='submit' className='signup-button'>
          Signup
        </button>
      </form>
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default Signup;
