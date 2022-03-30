import { IAction } from "../../../types/types";
import Actions from "../types/userActionTypes";

interface ILogin {
  login: string;
  password: string;
}

export const tryLoginAction = ({ login, password }: ILogin): IAction => ({
  type: Actions.TRY_LOGIN,
  payload: { login, password },
});

export const tryLogoutAction = (): IAction => ({
  type: Actions.TRY_LOGOUT,
  payload: null,
});

export const getLoginedUserAction = (): IAction => ({
  type: Actions.GET_USER,
  payload: null,
});

export const setUserAction = (user: any): IAction => ({
  type: Actions.SET_USER,
  payload: user,
});

export const resetUserAction = (): IAction => ({
  type: Actions.RESET_USER,
  payload: null,
});

export const setErrorLoginAction = (): IAction => ({
  type: Actions.SET_ERROR_LOGIN,
  payload: null,
});
