import { IAction, IDay, IYear, IRawData, RESULT } from "../../../types/types";
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

export const updateDayAction = (data: IRawData): IAction => ({
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

export const fetchExcelFileAction = (data: string[]): IAction => ({
  type: Actions.FECTH_EXCEL,
  payload: data,
});

export const setResultExcelAction = (data: RESULT): IAction => ({
  type: Actions.SET_RESULT_EXCEL,
  payload: data,
});

export const setExpandedRowAction = (data: string): IAction => ({
  type: Actions.SET_EXPANDED_ROW,
  payload: data,
});

export const setExpandedRowsAction = (data: string[]): IAction => ({
  type: Actions.SET_EXPANDED_ROWS,
  payload: data,
});

export const setEditiongAction = (data: string): IAction => ({
  type: Actions.SET_EDITING_KEY,
  payload: data,
});

export const setResultInsertAction = ({
  result,
  day,
}: {
  result: string;
  day: IDay;
}): IAction => ({
  type: Actions.INSERTED_DAY,
  payload: { result, day },
});

export const setResultUpdateAction = ({
  result,
}: {
  result: string;
}): IAction => ({
  type: Actions.UPDATED_DAY,
  payload: { result },
});

export const setIdleInsertAction = (): IAction => ({
  type: Actions.IDLE_INSERT_DAY,
  payload: null,
});
