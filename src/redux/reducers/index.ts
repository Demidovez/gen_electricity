import { combineReducers } from "redux";
import yearsReducer from "./yearsReducer";

const rootReducer = combineReducers({
  years: yearsReducer,
});

export default rootReducer;
