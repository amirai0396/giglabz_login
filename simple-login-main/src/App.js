
import React, { useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loginUser, signupUser } from './actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }
  }, [dispatch]);

  const handleLogin = (user) => {
    dispatch(loginUser(user));
  };

  const handleSignup = (user) => {
    dispatch(signupUser(user));
  };

  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login onLogin={handleLogin} />
        </Route>
        <Route path='/signup'>
          <Signup onSignup={handleSignup} />
        </Route>
        <PrivateRoute path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;
