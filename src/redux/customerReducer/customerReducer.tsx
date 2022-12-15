import { customerAPI } from "../../api/api";
import { ICustomer } from "../../shared/interfaces/customer.interface";

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

export const setCustomers = (customersData: Array<ICustomer>) => ({
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
