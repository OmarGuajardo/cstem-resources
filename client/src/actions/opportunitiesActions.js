import {
  FETCH_OPPORTUNITY,
  CREATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  SET_LOADING,
  SET_ERROR_STATUS,
  CLEAR_ERRORS,
} from "./types";
import axios from "axios";

//Retrieving Opportunities
export const fetchOpportunities = (classification) => async (dispatch) => {
  dispatch(setOpportunitiesLoading(FETCH_OPPORTUNITY));
  try {
    const res = await axios.get(`/api/opportunities?c=${classification}`);
    const data = await res.data;
    dispatch({
      type: FETCH_OPPORTUNITY,
      payload: data,
    });
    clearErrors(dispatch);
  } catch (err) {
    dispatchError(dispatch, FETCH_OPPORTUNITY, err);
    console.log("something went wrong fetching opps ", err);
  }
};

//Creating Opportunities
export const createOpportunity = (newOpportunity) => async (
  dispatch,
  getState
) => {
  dispatch(setOpportunitiesLoading(CREATE_OPPORTUNITY));
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const res = await axios.post(
      "/api/opportunities",
      JSON.stringify(newOpportunity),
      config
    );
    dispatch({
      type: CREATE_OPPORTUNITY,
      payload: [...getState().opportunities.items, res.data.body],
    });
    clearErrors(dispatch);
  } catch (err) {
    dispatchError(dispatch, CREATE_OPPORTUNITY, err);
  }
};
//UPDATING Opportunity
export const updateOpportunity = (updatedOpportunity, id) => async (
  dispatch,
  getState
) => {
  dispatch(setOpportunitiesLoading(UPDATE_OPPORTUNITY));
  try {
    const res = await axios.put(`/api/opportunities/${id}`, updatedOpportunity);
    let updatedOpportunities = getState().opportunities.items.filter(
      (op) => op._id !== id
    );
    updatedOpportunities = [...updatedOpportunities, res.data.body];

    dispatch({
      type: UPDATE_OPPORTUNITY,
      payload: updatedOpportunities,
    });
    clearErrors(dispatch);
  } catch (err) {
    dispatchError(dispatch, UPDATE_OPPORTUNITY, err);
  }
};

//Deleting Opportunities
export const deleteOpportunity = (opportunitiesToDelete) => async (
  dispatch,
  getState
) => {
  dispatch(setOpportunitiesLoading(DELETE_OPPORTUNITY));
  const body = { opportunitiesToDelete: [...opportunitiesToDelete] };
  try {
    const res = await axios.delete("/api/opportunities", { data: body });
    if (res.status === 200) {
      let updatedOpportunities = getState().opportunities.items.filter(
        (op) => !opportunitiesToDelete.includes(op._id)
      );
      dispatch({
        type: DELETE_OPPORTUNITY,
        payload: updatedOpportunities,
      });
      clearErrors(dispatch);
    }
  } catch (err) {
    dispatchError(dispatch, DELETE_OPPORTUNITY, err);
  }
};

const setOpportunitiesLoading = (action) => {
  return {
    type: SET_LOADING,
    payload: action,
  };
};
const clearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
const dispatchError = (dispatch, type, msg) => {
  dispatch({
    type: SET_ERROR_STATUS,
    payload: {
      error: type,
      message: msg.message,
    },
  });
};
