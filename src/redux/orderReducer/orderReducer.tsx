import { IOrder } from "../../shared/interfaces/order.interface";
import { SetOrdersType } from "./orderActionCreator";
import * as actionType from "./orderActionType";

interface IOrderState {
  ordersData: IOrder[];
}

let initialState: IOrderState = {
  ordersData: [],
};

export const orderReducer = (
  state = initialState,
  action: ActionType,
): IOrderState => {
  switch (action.type) {
    case actionType.SET_ORDERS:
      return { ...state, ordersData: action.ordersData };

    default:
      return state;
  }
};

type ActionType = SetOrdersType;
