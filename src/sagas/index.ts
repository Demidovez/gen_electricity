import { all } from "redux-saga/effects";
import yearsSaga from "./yearsSaga";
import userSaga from "./userSaga";

function* rootSaga() {
  yield all([yearsSaga(), userSaga()]);
}

export default rootSaga;
