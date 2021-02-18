import { combineReducers } from "redux";

import opportunityReducer from "../reducers/oppportunityReducer";
import authReducer from "../reducers/authReducer";

export default combineReducers({
  opportunities: opportunityReducer,
  auth: authReducer,
});
