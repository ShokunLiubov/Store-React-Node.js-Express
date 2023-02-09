import { IOrder } from "../../shared/interfaces/order.interface";
import * as actionType from "./orderActionType";

export type SetOrdersType = {
  type: string;
  ordersData: Array<IOrder>;
};

export const setOrders = (ordersData: Array<IOrder>): SetOrdersType => ({
  type: actionType.SET_ORDERS,
  ordersData,
});
