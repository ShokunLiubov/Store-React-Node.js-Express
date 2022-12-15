import { customerAPI } from "../../api/api";
import { IUserInfo } from "../../shared/interfaces/userInfo.interface";

const SET_CUSTOMERS: string = "SET-CUSTOMERS";

let initialState: any = {
  customersData: {},
};

export const customerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CUSTOMERS:
      return { ...state, customersData: action.customersData };

    default:
      return state;
  }
};

export const setCustomers = (customersData: Array<IUserInfo>) => ({
  type: SET_CUSTOMERS,
  customersData,
});

export const getCustomers = () => {
  return (dispatch: any) => {
    customerAPI.getCustomer().then((data) => {
      dispatch(setCustomers(data));
    });
  };
};
