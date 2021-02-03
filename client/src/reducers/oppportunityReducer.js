import { FETCH_OPPORTUNITIES, NEW_OPPORTUNITY } from "../actions/types";

const intialState = {
  items: [],
  item: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FETCH_OPPORTUNITIES:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
