import { AnyAction } from "redux";
import { IUser } from "../../shared/interfaces/user.interface";
import * as actionType from "./authActionType";

interface IAuthState {
  user: IUser | {};
  isAuth: boolean;
  isLoading: boolean;
}

let initialState: IAuthState = {
  user: {},
  isAuth: false,
  isLoading: false,
};

export const authReducer = (
  state = initialState,
  action: AnyAction,
): IAuthState => {
  switch (action.type) {
    case actionType.SET_AUTH:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case actionType.OUT_AUTH:
      return {
        ...state,
        user: {} as IUser,
        isAuth: false,
      };
    case actionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.boolean,
      };
    default:
      return state;
  }
};
