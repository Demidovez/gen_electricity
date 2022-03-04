import { combineReducers } from "redux";
import daysReducer from "./daysReducer";

const rootReducer = combineReducers({
  days: daysReducer,
});

export default rootReducer;
