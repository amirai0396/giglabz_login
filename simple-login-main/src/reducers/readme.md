# Authentication Reducer Explanation

## Overview
The provided code represents an authentication reducer responsible for managing authentication-related states within a Redux store.

### Initial State
The reducer initializes its state with the following structure:
```javascript
const initialState = {
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      // Resets the user and error upon successful signup
      return { ...state, user: null, error: null };
    case 'LOGIN_SUCCESS':
      // Updates the user upon successful login, clearing the error
      return { ...state, user: action.payload, error: null };
    case 'LOGIN_ERROR':
    case 'SIGNUP_ERROR':
      // Clears the user and sets the error upon login or signup failure
      return { ...state, user: null, error: action.error };
    case 'LOGOUT':
      // Clears the user upon logout
      return { ...state, user: null };
    default:
      // Returns the current state for unhandled actions
      return state;
  }
};
