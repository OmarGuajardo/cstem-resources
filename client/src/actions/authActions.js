import { AUTH_ERROR, LOGIN_USER } from "./types";

import axios from "axios";

export const loginUser = (body) => (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    });
};
