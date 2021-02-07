import { FETCH_OPPORTUNITIES } from "./types";

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
