const initialState = {
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return { ...state, user: null, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, error: null };
    case 'LOGIN_ERROR':
    case 'SIGNUP_ERROR':
      return { ...state, user: null, error: action.error };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};
