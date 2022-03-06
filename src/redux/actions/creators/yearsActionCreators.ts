import { IAction, IDay, IYear } from "../../../types/types";
import Actions from "../types/yearsActionTypes";

export const fetchYearAction = (data: number): IAction => ({
  type: Actions.FETCH_YEAR,
  payload: data,
});

export const setYearAction = (data: IYear): IAction => ({
  type: Actions.SET_YEAR,
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
