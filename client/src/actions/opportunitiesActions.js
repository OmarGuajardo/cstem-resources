import {
  FETCH_OPPORTUNITIES,
  CREATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
} from "./types";
import axios from "axios";

export const fetchOpportunities = () => (dispatch) => {
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

export const createOpportunity = (newOpportunity) => (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  axios
    .post("/api/opportunities", JSON.stringify(newOpportunity), config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: CREATE_OPPORTUNITY,
          payload: res.data,
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

export const deleteOpportunity = (opportunitiesToDelete) => (dispatch) => {
  const body = { opportunitiesToDelete: [...opportunitiesToDelete] };

  axios
    .delete("/api/opportunities", { data: body })
    .then((res) => {
      dispatch({
        type: DELETE_OPPORTUNITY,
        payload: opportunitiesToDelete,
      });
    })
    .catch((err) => console.log("Somethign went wrong deleting the opps", err));
};
