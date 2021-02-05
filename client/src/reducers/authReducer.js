import { LOGIN_USER, AUTH_ERROR } from "../actions/types";

const intialState = {
  token: null,
  isAuthenticated: false,
  isLoading: null,
  user: {},
  error: null,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
