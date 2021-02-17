import {
  FETCH_OPPORTUNITIES,
  CREATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
  UPDATE_OPPORTUNITY,
  SET_LOADING,
  FETCHING_OPPORTUNITY,
  UPDATING_OPPORTUNITY,
  DELETING_OPPORTUNITY,
  CREATING_NEW_OPPORTUNITY,
} from "./types";
import axios from "axios";

//Retrieving Opportunities
export const fetchOpportunities = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: FETCHING_OPPORTUNITY,
  });
  fetch("/api/opportunities?c=INL")
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_OPPORTUNITIES,
        payload: data,
      });
    })
    .catch((err) => console.log("something went wrong fetching the data"));
};

//Creating Opportunities
export const createOpportunity = (newOpportunity) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: CREATING_NEW_OPPORTUNITY,
  });
  const config = { headers: { "Content-Type": "application/json" } };
  axios
    .post("/api/opportunities", JSON.stringify(newOpportunity), config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.body);
        dispatch({
          type: CREATE_OPPORTUNITY,
          payload: res.data.body,
        });
      } else {
        //TOOD: Do something if they gave us wrong info
        console.log("Something went wrong when saving opp " + res);
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("There was an error making an Opportunity");
      //TODO: Do something if we aren't able to save opportunity
    });
};
//UPDATING Opportunity
export const updateOpportunity = (updatedOpportunity, id) => (
  dispatch,
  getState
) => {
  dispatch({
    type: SET_LOADING,
    payload: UPDATING_OPPORTUNITY,
  });
  axios
    .put(`/api/opportunities/${id}`, updatedOpportunity)
    .then((res) => {
      if (res.status === 200) {
        let updatedOpportunities = getState().opportunities.items.filter(
          (op) => op._id !== id
        );
        updatedOpportunities = [...updatedOpportunities, res.data.body];
        dispatch({
          type: UPDATE_OPPORTUNITY,
          payload: updatedOpportunities,
        });
      } else {
        console.log("Something went wrong when saving opp " + res);
      }
    })
    .catch((err) => {
      console.log("There was an error updating an Opportunity", err);
    });
};

//Deleting Opportunities
export const deleteOpportunity = (opportunitiesToDelete) => (
  dispatch,
  getState
) => {
  dispatch({
    type: SET_LOADING,
    payload: DELETING_OPPORTUNITY,
  });
  const body = { opportunitiesToDelete: [...opportunitiesToDelete] };

  axios
    .delete("/api/opportunities", { data: body })
    .then((res) => {
      if (res.status == 200) {
        let updatedOpportunities = getState().opportunities.items.filter(
          (op) => {
            if (!opportunitiesToDelete.includes(op._id)) {
              return op;
            }
          }
        );
        dispatch({
          type: DELETE_OPPORTUNITY,
          payload: updatedOpportunities,
        });
      }
    })
    .catch((err) => console.log("Somethign went wrong deleting the opps", err));
};
