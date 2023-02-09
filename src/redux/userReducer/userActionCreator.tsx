import * as actionType from "./userActionType";
import { IUser } from "../../shared/interfaces/user.interface";
import { IUserInfo } from "../../shared/interfaces/userInfo.interface";

export const setUsers = (usersData: Array<IUser>) => ({
  type: actionType.SET_USERS,
  usersData,
});

export const setUserInfo = (userInfo: IUserInfo) => ({
  type: actionType.SET_USER_INFO,
  userInfo,
});
