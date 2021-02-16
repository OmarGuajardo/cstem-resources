import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

export const authMiddleWare = (store) => (next) => (action) => {
  console.log("authMiddleWare iis being triggered, from ", action.type);
  if (action.type != LOGIN_USER) {
    axios
      .get("/api/auth/checkToken")
      .then((res) => {
        console.log(
          "user is identified so I'm just going to keep going like norma"
        );
        next(action);
      })
      .catch((err) => {
        console.log("user not identified, next will be LOGGIN Them out ");
        next({
          type: LOGOUT_USER,
        });
      });
  } else {
    console.log("should call next bc not LOGIN USEr");
    next(action);
  }
};
