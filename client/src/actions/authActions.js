import { AUTH_ERROR, LOGOUT_USER, LOGIN_USER } from "./types";

import axios from "axios";

export const loginUser = (body) => (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      const payload = {
        data: res.data,
        token: res.headers["auth-token"],
      };
      console.log("logging in from authActions");
      dispatch({
        type: LOGIN_USER,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};

export const loginWithToken = (token) => (dispatch) => {
  axios
    .get("/api/auth/checkToken")
    .then((res) => {
      const data = {
        data: res.data.body,
        token: token,
      };
      dispatch({
        type: LOGIN_USER,
        payload: data,
      });
    })
    .catch((err) => {
      //TODO: Set Loading to False and put Auth Error
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    });
};
