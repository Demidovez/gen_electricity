import { IAction, IYear } from "../../types/types";
import Actions from "../actions/types/yearsActionTypes";

interface IDaysState {
  years: IYear[];
  isLoadingYears: boolean;
  isLoadingYear: boolean;
}

const initialState: IDaysState = {
  years: [],
  isLoadingYears: false,
  isLoadingYear: false,
};

const dataReducer = (state = initialState, action: IAction): IDaysState => {
  switch (action.type) {
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
    case Actions.FETCH_YEAR:
      return {
        ...state,
        isLoadingYear: true,
      };
    case Actions.SET_YEAR:
      return {
        ...state,
        isLoadingYear: false,
        years: state.years.map((year) => {
          if (year.year === action.payload.year) {
            return action.payload;
          } else {
            return year;
          }
        }),
      };
    default:
      return state;
  }
};

export default dataReducer;
