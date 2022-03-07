import { put, call, takeEvery } from "redux-saga/effects";
import Actions from "../redux/actions/types/yearsActionTypes";
import { fetchYear, fetchYears, updateDayData } from "../api";
import {
  setYearAction,
  setYearsAction,
} from "../redux/actions/creators/yearsActionCreators";
import { IAction } from "../types/types";

function* workerFetchYears(action: IAction) {
  const { data } = yield call(fetchYears);

  yield put(setYearsAction(data));
}

function* workerFetchYear(action: IAction) {
  const { data } = yield call(fetchYear, action.payload);

  yield put(setYearAction(data));
}

function* workerUpdateDay(action: IAction) {
  yield call(updateDayData, action.payload);

  // yield put(setYearAction(data));
}

export default function* watcherSaga() {
  yield takeEvery(Actions.FETCH_YEARS, workerFetchYears);
  yield takeEvery(Actions.FETCH_YEAR, workerFetchYear);
  yield takeEvery(Actions.UPDATE_DAY, workerUpdateDay);
}
