import { IAction } from "../../types/types";
import Actions from "../actions/types/userActionTypes";

interface IState {
  id: any;
  isLogined: boolean;
  isTryingLogin: boolean;
  login: string;
  firstname: string;
  lastname: string;
  role: string;
  config: any;
  isUnknownUser: boolean;
}

const initialState: IState = {
  id: null,
  isLogined: false,
  isTryingLogin: false,
  login: "",
  firstname: "",
  lastname: "",
  role: "",
  config: null,
  isUnknownUser: false,
};

const dataReducer = (state = initialState, action: IAction): IState => {
  switch (action.type) {
    case Actions.TRY_LOGIN:
      return {
        ...state,
        isUnknownUser: false,
        isTryingLogin: true,
      };
    case Actions.SET_USER:
      return {
        ...state,
        id: action.payload.id,
        isLogined: true,
        login: action.payload.login,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        role: action.payload.role,
        config: action.payload.config,
        isTryingLogin: false,
        isUnknownUser: false,
      };
    case Actions.RESET_USER:
      return {
        ...initialState,
      };
    case Actions.SET_ERROR_LOGIN:
      return {
        ...state,
        isLogined: false,
        isTryingLogin: false,
        isUnknownUser: true,
      };
    default:
      return state;
  }
};

export default dataReducer;
