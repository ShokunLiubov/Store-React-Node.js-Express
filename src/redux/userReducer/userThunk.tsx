import * as AC from "./userActionCreator";
import { userService } from "../../api/services/userService";
import { IUserInfo } from "../../shared/interfaces/userInfo.interface";
import { Dispatch } from "redux";

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    const response = await userService.fetchUsers();
    dispatch(AC.setUsers(response.data));
  };
};

export const getUserInfo = () => {
  return async (dispatch: Dispatch) => {
    const response = await userService.getUserInfoForDelivery();
    dispatch(AC.setUserInfo(response.data));
  };
};

export const updateUserInfo = (value: IUserInfo) => {
  return async (dispatch: any) => {
    await userService.updateUserInfoForDelivery(value);
    dispatch(getUserInfo());
  };
};

export const createUserInfo = (value: IUserInfo) => {
  return async (dispatch: any) => {
    await userService.createUserInfoForDelivery(value);
    dispatch(getUserInfo());
  };
};
