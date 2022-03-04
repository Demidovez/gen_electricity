import { all } from "redux-saga/effects";
import daysSaga from "./daysSaga";

function* rootSaga() {
  yield all([daysSaga()]);
}

export default rootSaga;
