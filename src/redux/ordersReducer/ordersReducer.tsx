import { orderAPI } from "../../api/api";
import { orderService } from "../../api/services/OrderService";
import { IOrder } from "../../shared/interfaces/order.interface";

const SET_ORDERS: string = "SET-ORDERS";

let initialState: any = {
  ordersData: {},
};

export const ordersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, ordersData: action.ordersData };

    default:
      return state;
  }
};

export const setOrders = (ordersData: Array<IOrder>) => ({
  type: SET_ORDERS,
  ordersData,
});

export const getOrders = () => {
  return async (dispatch: any) => {
    let response = await orderService.getOrders();

    dispatch(setOrders(response.data));
  };
};
