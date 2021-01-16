import { combineReducers } from "redux";
import member from "./member";
import members from "./members";
import merchant from "./merchant";
import merchants from "./merchants";
import snackBar from "./snack-bar";

export default combineReducers({
  member,
  members,
  merchant,
  merchants,
  snackBar,
});
