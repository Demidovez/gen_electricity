import { IAction, IDay, EStatus, IYear } from "../../types/types";
import Actions from "../actions/types/daysActionTypes";

interface IDaysState {
  days: IDay[];
  years: IYear[];
  isLoadingDays: boolean;
  isLoadingYears: boolean;
}

const initialState: IDaysState = {
  days: [],
  years: [],
  isLoadingDays: false,
  isLoadingYears: false,
};

const dataReducer = (state = initialState, action: IAction): IDaysState => {
  switch (action.type) {
    case Actions.FETCH_DAYS:
      return {
        ...state,
        isLoadingDays: true,
      };
    case Actions.SET_DAYS:
      return {
        ...state,
        isLoadingDays: false,
        days: action.payload,
      };
    case Actions.FETCH_YEARS:
      return {
        ...state,
        isLoadingYears: true,
      };
    case Actions.SET_YEARS:
      return {
        ...state,
        isLoadingYears: false,
        years: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
