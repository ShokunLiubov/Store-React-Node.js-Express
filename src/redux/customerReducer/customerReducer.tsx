import { customerService } from "../../api/services/customerService";
import { IUser } from "../../shared/interfaces/user.interface";

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

export const setCustomers = (customersData: Array<IUser>) => ({
  type: SET_CUSTOMERS,
  customersData,
});

export const getCustomers = () => {
  return async (dispatch: any) => {
    const response = await customerService.fetchUsers();
    dispatch(setCustomers(response.data));
  };
};
