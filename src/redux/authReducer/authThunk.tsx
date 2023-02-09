import * as AC from "./authActionCreator";
import { authService } from "../../api/services/authService";
import { Dispatch } from "redux";
import { IAuth } from "../../shared/interfaces/auth.interface";

export const registrationUser = (value: IAuth) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await authService.registration(value);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(AC.setAuth(response.data.user));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const login = (value: IAuth) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await authService.login(value);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(AC.setAuth(response.data.user));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const logout = (value: IAuth) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await authService.logout();
      localStorage.removeItem("token");
      dispatch(AC.outAuth());
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch: Dispatch) => {
    dispatch(AC.setLoading(true));
    try {
      const response = await authService.refreshToken();

      localStorage.setItem("token", response.data.accessToken);
      dispatch(AC.setAuth(response.data.user));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      dispatch(AC.setLoading(false));
    }
  };
};
