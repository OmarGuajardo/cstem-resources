import { combineReducers } from "redux";

import opportunityReducer from "../reducers/oppportunityReducer";

export default combineReducers({
  opportunities: opportunityReducer,
});
