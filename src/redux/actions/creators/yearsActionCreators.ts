import {
  IAction,
  ITableData,
  IDay,
  IYear,
  IRawData,
} from "../../../types/types";
import Actions from "../types/yearsActionTypes";

export const fetchYearsAction = (): IAction => ({
  type: Actions.FETCH_YEARS,
  payload: null,
});

export const setYearsAction = (data: IYear[]): IAction => ({
  type: Actions.SET_YEARS,
  payload: data,
});

export const fetchDaysAction = (year?: number): IAction => ({
  type: Actions.FETCH_DAYS,
  payload: year,
});

export const setDaysAction = (data: IDay[]): IAction => ({
  type: Actions.SET_DAYS,
  payload: data,
});

export const updateDayAction = (data: ITableData): IAction => ({
  type: Actions.UPDATE_DAY,
  payload: data,
});

export const insertDayAction = (data: IRawData): IAction => ({
  type: Actions.INSERT_DAY,
  payload: data,
});
