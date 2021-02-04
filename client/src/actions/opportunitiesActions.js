import { FETCH_OPPORTUNITIES, NEW_OPPORTUNITY } from "./types";

export const fetchOpportunities = () => (dispatch) => {
  console.log("fetchOpportunites being called");
  fetch("/api/opportunities?c=INL")
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_OPPORTUNITIES,
        payload: data,
      });
      console.log(data);
    })
    .catch((err) => console.log("something went wrong fetching the data"));
};
