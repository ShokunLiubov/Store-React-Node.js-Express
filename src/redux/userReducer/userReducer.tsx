import { AnyAction } from "redux";
import { IUser } from "../../shared/interfaces/user.interface";
import * as actionType from "./userActionType";

interface IUserState {
  usersData: IUser[];
  userInfo: any;
}

let initialState: IUserState = {
  usersData: [],
  userInfo: {},
};

export const userReducer = (
  state = initialState,
  action: AnyAction,
): IUserState => {
  switch (action.type) {
    case actionType.SET_USERS:
      return { ...state, usersData: action.usersData };

    case actionType.SET_USER_INFO:
      return { ...state, userInfo: action.userInfo };
    default:
      return state;
  }
};
