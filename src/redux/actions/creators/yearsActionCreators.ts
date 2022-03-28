import {
  IAction,
  ITableData,
  IDay,
  IYear,
  IRawData,
  RESULT,
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

export const deleteDayAction = (data: string): IAction => ({
  type: Actions.DELETE_DAY,
  payload: data,
});

export const fetchExcelFileAction = (): IAction => ({
  type: Actions.FECTH_EXCEL,
  payload: null,
});

export const setResultExcelAction = (data: RESULT): IAction => ({
  type: Actions.SET_RESULT_EXCEL,
  payload: data,
});
