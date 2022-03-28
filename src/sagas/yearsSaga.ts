import { put, call, takeEvery } from "redux-saga/effects";
import Actions from "../redux/actions/types/yearsActionTypes";
import {
  deleteDayData,
  fetchDays,
  fetchExcelData,
  fetchYears,
  insertDayData,
  updateDayData,
} from "../api";
import {
  setDaysAction,
  setResultExcelAction,
  setYearsAction,
} from "../redux/actions/creators/yearsActionCreators";
import { IAction, IDay, IYear } from "../types/types";

function* workerFetchYears(action: IAction) {
  const data: IYear[] = yield call(fetchYears);

  yield put(setYearsAction(data));
}

function* workerFetchDays(action: IAction) {
  const data: IDay[] = yield call(fetchDays, action.payload);

  yield put(setDaysAction(data));
}

function* workerUpdateDay(action: IAction) {
  yield call(updateDayData, action.payload);

  // yield put(setYearAction(data));
}

function* workerInsertDay(action: IAction) {
  yield call(insertDayData, action.payload);
}

function* workerDeleteDay(action: IAction) {
  yield call(deleteDayData, action.payload);
}

function* workerFetchExcel() {
  const { data } = yield call(fetchExcelData);

  yield put(setResultExcelAction(data));
}

export default function* watcherSaga() {
  yield takeEvery(Actions.FETCH_YEARS, workerFetchYears);
  yield takeEvery(Actions.FETCH_DAYS, workerFetchDays);
  yield takeEvery(Actions.UPDATE_DAY, workerUpdateDay);
  yield takeEvery(Actions.INSERT_DAY, workerInsertDay);
  yield takeEvery(Actions.DELETE_DAY, workerDeleteDay);
  yield takeEvery(Actions.FECTH_EXCEL, workerFetchExcel);
}
