import { combineReducers } from "redux";
import yearsReducer from "./yearsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  years: yearsReducer,
  user: userReducer,
});

export default rootReducer;
