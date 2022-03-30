import { put, call, takeEvery } from "redux-saga/effects";
import { getUser, tryLogin, tryLogout } from "../api";
import {
  resetUserAction,
  setErrorLoginAction,
  setUserAction,
} from "../redux/actions/creators/userActionCreators";
import Actions from "../redux/actions/types/userActionTypes";
import { IAction, IUser } from "../types/types";

function* workerTryLogin(action: IAction) {
  const user: IUser = yield call(tryLogin, action.payload);

  if (user) {
    yield put(setUserAction(user));
  } else {
    yield put(setErrorLoginAction());
  }
}

function* workerTryLogout() {
  const result: boolean = yield call(tryLogout);

  if (result) {
    yield put(resetUserAction());
  }
}

function* workerGetUser() {
  const user: IUser = yield call(getUser);

  if (user) {
    yield put(setUserAction(user));
  } else {
    yield put(setErrorLoginAction());
  }
}

export default function* watcherSaga() {
  yield takeEvery(Actions.TRY_LOGIN, workerTryLogin);
  yield takeEvery(Actions.TRY_LOGOUT, workerTryLogout);
  yield takeEvery(Actions.GET_USER, workerGetUser);
}
