import { userService } from "../../api/services/userService";
import { IUser } from "../../shared/interfaces/user.interface";
import { IUserInfo } from "../../shared/interfaces/userInfo.interface";

const SET_USERS: string = "SET-USERS";
const SET_USER_INFO: string = "SET-USER-INFO";

let initialState: any = {
  usersData: [],
  userInfo: {} as IUserInfo,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, usersData: action.usersData };

    case SET_USER_INFO:
      return { ...state, userInfo: action.userInfo };
    default:
      return state;
  }
};

export const setUsers = (usersData: Array<IUser>) => ({
  type: SET_USERS,
  usersData,
});

export const setUserInfo = (userInfo: IUserInfo) => ({
  type: SET_USER_INFO,
  userInfo,
});

export const getUsers = () => {
  return async (dispatch: any) => {
    const response = await userService.fetchUsers();
    dispatch(setUsers(response.data));
  };
};

export const getUserInfo = () => {
  return async (dispatch: any) => {
    const response = await userService.getUserInfoForDelivery();
    dispatch(setUserInfo(response.data));
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
