import {
  FETCH_OPPORTUNITY,
  CREATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  SET_LOADING,
  SET_ERROR_STATUS,
  CLEAR_ERRORS,
} from "../actions/types";

const intialState = {
  items: [],
  error: null,
  message: null,
  loading: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FETCH_OPPORTUNITY:
    case CREATE_OPPORTUNITY:
    case UPDATE_OPPORTUNITY:
    case DELETE_OPPORTUNITY:
      return {
        ...state,
        items: action.payload,
        loading: { ...state.loading, [action.type]: false },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: true },
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        message: null,
      };
    case SET_ERROR_STATUS:
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message,
        loading: { ...state.loading, [action.payload.error]: false },
      };
    default:
      return state;
  }
};
