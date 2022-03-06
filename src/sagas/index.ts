import { all } from "redux-saga/effects";
import yearsSaga from "./yearsSaga";

function* rootSaga() {
  yield all([yearsSaga()]);
}

export default rootSaga;
