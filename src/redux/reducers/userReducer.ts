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
  errorMessage: string;
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
  errorMessage: "",
};

const dataReducer = (state = initialState, action: IAction): IState => {
  switch (action.type) {
    case Actions.TRY_LOGIN:
      return {
        ...state,
        errorMessage: "",
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
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
