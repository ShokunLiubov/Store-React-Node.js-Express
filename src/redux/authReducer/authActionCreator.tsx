import * as actionType from "./authActionType";
import { IUser } from "../../shared/interfaces/user.interface";

export const setAuth = (payload: IUser) => ({
  type: actionType.SET_AUTH,
  payload,
});

export const outAuth = () => ({ type: actionType.OUT_AUTH });

export const setLoading = (boolean: boolean) => ({
  type: actionType.SET_LOADING,
  boolean,
});
