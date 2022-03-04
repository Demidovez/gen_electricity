import { IAction, IDay } from "../../../types/types";
import Actions from "../types/daysActionTypes";

export const fetchDaysAction = (): IAction => ({
  type: Actions.FETCH_DAYS,
  payload: null,
});

export const setDaysAction = (data: IDay[]): IAction => ({
  type: Actions.SET_DAYS,
  payload: data,
});
