import {
  FETCH_OPPORTUNITIES,
  CREATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  SET_LOADING,
  CREATING_NEW_OPPORTUNITY,
  UPDATING_OPPORTUNITY,
  DELETING_OPPORTUNITY,
  FETCHING_OPPORTUNITY,
} from "../actions/types";

const intialState = {
  items: [],
  error: null,
  loading: {
    CREATING_NEW_OPPORTUNITY: false,
    UPDATING_OPPORTUNITY: false,
    DELETING_OPPORTUNITY: false,
    FETCHING_OPPORTUNITY: false,
  },
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FETCH_OPPORTUNITIES:
      return {
        ...state,
        items: action.payload,
        loading: { ...state.loading, FETCHING_OPPORTUNITY: false },
      };
    case CREATE_OPPORTUNITY:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: { ...state.loading, CREATING_NEW_OPPORTUNITY: false },
      };
    case UPDATE_OPPORTUNITY:
      return {
        ...state,
        items: action.payload,
        loading: { ...state.loading, UPDATING_OPPORTUNITY: false },
      };
    case DELETE_OPPORTUNITY:
      return {
        ...state,
        items: action.payload,
        loading: { ...state.loading, DELETING_OPPORTUNITY: false },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: true },
      };
    default:
      return state;
  }
};
