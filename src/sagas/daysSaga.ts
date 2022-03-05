import { put, call, takeEvery } from "redux-saga/effects";
import Actions from "../redux/actions/types/daysActionTypes";
import { fetchDays, fetchYears } from "../api";
import {
  setDaysAction,
  setYearsAction,
} from "../redux/actions/creators/daysActionCreators";
import { IAction } from "../types/types";

function* workerFetchDays(action: IAction) {
  const { data } = yield call(fetchDays);

  yield put(setDaysAction(data));
}

function* workerFetchYears(action: IAction) {
  const { data } = yield call(fetchYears);

  yield put(setYearsAction(data));
}

export default function* watcherSaga() {
  yield takeEvery(Actions.FETCH_DAYS, workerFetchDays);
  yield takeEvery(Actions.FETCH_YEARS, workerFetchYears);
}
