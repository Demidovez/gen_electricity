import { all } from "redux-saga/effects";
import daySaga from "./daysSaga";

function* rootSaga() {
  yield all([daySaga()]);
}

export default rootSaga;
