import {
  FETCH_OPPORTUNITIES,
  CREATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
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
      };
    case CREATE_OPPORTUNITY:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_OPPORTUNITY:
      return {
        ...state,
        items: action.payload,
      };
    case DELETE_OPPORTUNITY:
      return {
        ...state,
        items: state.items.filter((item) => {
          if (!action.payload.includes(item._id)) {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};
