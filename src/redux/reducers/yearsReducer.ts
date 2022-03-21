import { IAction, IDay, IYear } from "../../types/types";
import Actions from "../actions/types/yearsActionTypes";

interface IDaysState {
  yearsRaw: IYear[];
  daysRaw: IDay[];
  isLoadingYearsRaw: boolean;
  isLoadingDaysRaw: boolean;
  isLoadingYear: boolean;
}

const initialState: IDaysState = {
  yearsRaw: [],
  daysRaw: [],
  isLoadingYearsRaw: false,
  isLoadingDaysRaw: false,
  isLoadingYear: false,
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
    case Actions.FETCH_DAYS:
      return {
        ...state,
        isLoadingDaysRaw: true,
      };
    case Actions.SET_DAYS:
      return {
        ...state,
        isLoadingDaysRaw: false,
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
              shortdate: `c 1 по ${new Date(day.date).getDate()}`,
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
            shortdate: `c 1 по ${new Date(action.payload.date).getDate()}`,
          },
        ],
      };
    default:
      return state;
  }
};

export default dataReducer;
