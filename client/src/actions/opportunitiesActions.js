import { FETCH_OPPORTUNITIES, NEW_OPPORTUNITY } from "./types";

// export const fetchOpportunities = async () => {
//   try {
//     const response = await fetch("/api/opportunities?c=INL");
//     const data = await response.json();
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//     console.log("Something went wrong fetching Opportunities");
//   }
// };

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
