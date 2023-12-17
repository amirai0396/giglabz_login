
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
var mock = new MockAdapter(axios);

mock.onPost('/api/signup').reply((config) => {
  const user = JSON.parse(config.data);
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return [200, { user }];
});

mock.onPost('/api/login').reply((config) => {
  const { username, password } = JSON.parse(config.data);
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    return [200, { name: user.username }];
  } else {
    return [400, { error: 'Invalid username or password' }];
  }
});

mock.onPost('/api/logout').reply(200);

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/login', user);
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } catch (error) {
      console.log('error: ', error);
      dispatch({ type: 'LOGIN_ERROR', error: error.response.data.error });
    }
  };
};

export const signupUser = (user, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/signup', user);
      dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
      history.push('/login');
    } catch (error) {
      dispatch({ type: 'SIGNUP_ERROR', error: error.response.data.error });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      await axios.post('/api/logout');
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('user');
    } catch (error) {
    }
  };
};
