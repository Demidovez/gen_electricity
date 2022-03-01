import { put, call, takeEvery } from "redux-saga/effects";
import Actions from "../redux/actions/types/daysActionTypes";
import { fetchDays } from "../api";
import { setDaysAction } from "../redux/actions/creators/daysActionCreators";
import { IAction } from "../types/types";

function* workerFetchDays(action: IAction) {
  const { data } = yield call(fetchDays);

  yield put(setDaysAction(data));
}

export default function* watcherSaga() {
  yield takeEvery(Actions.FETCH_DAYS, workerFetchDays);
}
