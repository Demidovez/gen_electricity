import { IAction, IDay, IExpandedRow, IYear, RESULT } from "../../types/types";
import Actions from "../actions/types/yearsActionTypes";

interface IDaysState {
  yearsRaw: IYear[];
  daysRaw: IDay[];
  isLoadingYearsRaw: boolean;
  isFetchingExcel: boolean;
  resultExcel: RESULT;
  expandedRows: string[];
}

const initialState: IDaysState = {
  yearsRaw: [],
  daysRaw: [],
  isLoadingYearsRaw: false,
  isFetchingExcel: false,
  resultExcel: RESULT.idle,
  expandedRows: [],
};

const dataReducer = (state = initialState, action: IAction): IDaysState => {
  switch (action.type) {
    case Actions.FETCH_YEARS:
      return {
        ...state,
        isLoadingYearsRaw: true,
      };
    case Actions.SET_YEARS:
      return {
        ...state,
        isLoadingYearsRaw: false,
        yearsRaw: action.payload,
      };
    case Actions.SET_DAYS:
      return {
        ...state,
        // Добавляем новые дни, с проверкой что их не было в старом списке
        daysRaw: [
          ...state.daysRaw,
          ...action.payload
            .filter(
              (day: any) =>
                !state.daysRaw.some((dayRow) => dayRow.date === day.date)
            )
            .map((day: IDay) => ({
              ...day,
              key: `day_${day.date}`,
              shortdate: `с 1 по ${new Date(day.date).getDate()}`,
            })),
        ],
      };
    case Actions.INSERT_DAY:
      return {
        ...state,
        // Добавляем новый день
        daysRaw: [
          ...state.daysRaw,
          {
            ...action.payload,
            key: `day_${action.payload.date}`,
            shortdate: `с 1 по ${new Date(action.payload.date).getDate()}`,
          },
        ],
      };
    case Actions.FECTH_EXCEL:
      return {
        ...state,
        isFetchingExcel: true,
        resultExcel: initialState.resultExcel,
      };
    case Actions.SET_RESULT_EXCEL:
      return {
        ...state,
        isFetchingExcel: false,
        resultExcel: action.payload,
      };
    case Actions.SET_EXPANDED_ROW:
      return {
        ...state,
        expandedRows: state.expandedRows.some((row) => row === action.payload)
          ? state.expandedRows.filter((row) => !row.includes(action.payload))
          : [...state.expandedRows, action.payload],
      };
    case Actions.SET_EXPANDED_ROWS:
      return {
        ...state,
        expandedRows: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
