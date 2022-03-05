import { IAction, IDay, IYear } from "../../../types/types";
import Actions from "../types/daysActionTypes";

export const fetchDaysAction = (): IAction => ({
  type: Actions.FETCH_DAYS,
  payload: null,
});

export const setDaysAction = (data: IDay[]): IAction => ({
  type: Actions.SET_DAYS,
  payload: data,
});

export const fetchYearsAction = (): IAction => ({
  type: Actions.FETCH_YEARS,
  payload: null,
});

export const setYearsAction = (data: IYear[]): IAction => ({
  type: Actions.SET_YEARS,
  payload: data,
});
