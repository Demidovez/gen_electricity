import { IAction, IDay, EStatus } from "../../types/types";
import Actions from "../actions/types/daysActionTypes";

interface IDaysState {
  days: IDay[];
  status: EStatus;
}

const initialState: IDaysState = {
  days: [],
  status: EStatus.DONE,
};

const dataReducer = (state = initialState, action: IAction): IDaysState => {
  switch (action.type) {
    case Actions.FETCH_DAYS:
      return {
        ...state,
        status: EStatus.LOADING,
      };
    case Actions.SET_DAYS:
      return {
        ...state,
        status: EStatus.DONE,
        days: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
