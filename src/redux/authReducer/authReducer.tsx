import { IUser } from "../../shared/interfaces/user.interface";
import { authService } from "../../api/services/authService";

const SET_AUTH = "auth/SET-AUTH-DATA";
const OUT_AUTH = "auth/OUT-AUTH";
const SET_LOADING = "auth/SET-LOADING";

let initialState: any = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case OUT_AUTH:
      return {
        ...state,
        user: {} as IUser,
        isAuth: false,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.boolean,
      };
    default:
      return state;
  }
};

export const setAuth = (payload: IUser) => ({ type: SET_AUTH, payload });
export const outAuth = () => ({ type: OUT_AUTH });
export const setLoading = (boolean: boolean) => ({
  type: SET_LOADING,
  boolean,
});

export const registrationUser = (value: any) => {
  return async (dispatch: any) => {
    try {
      const response = await authService.registration(value);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setAuth(response.data.user));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const login = (value: any) => {
  return async (dispatch: any) => {
    try {
      const response = await authService.login(value);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setAuth(response.data.user));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const logout = (value: any) => {
  return async (dispatch: any) => {
    try {
      const response = await authService.logout();
      localStorage.removeItem("token");
      dispatch(outAuth());
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      const response = await authService.refreshToken();

      localStorage.setItem("token", response.data.accessToken);
      dispatch(setAuth(response.data.user));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
