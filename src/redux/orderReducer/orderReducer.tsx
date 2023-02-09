import { orderService } from "../../api/services/orderService";
import { IOrder } from "../../shared/interfaces/order.interface";
import { IProductBasket } from "../../shared/interfaces/productBasket.interface";
import { setEmptyBasket } from "../basketReducer/basketReducer";

const SET_ORDERS: string = "SET-ORDERS";

export interface IOrderState {
  ordersData: IOrder[];
}

type OrderAction = {
  type: string;
  ordersData: IOrder[];
};

let initialState: IOrderState = {
  ordersData: [],
};

export const orderReducer = (state = initialState, action: OrderAction) => {
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

export const createOrder = (togetherPrice: number) => {
  return async (dispatch: any, getState: any) => {
    try {
      const { basket, user } = getState();

      const { address, fullName } = user.userInfo;

      const products = basket.productsBasket.map((product: IProductBasket) => {
        return { productId: product.id, count: product.count };
      });

      const order = {
        products: products,
        fullName: fullName,
        address: address,
        allPrice: togetherPrice,
      };
      await orderService.createOrder(order);
      dispatch(setEmptyBasket());
    } catch (e) {
      console.log(e);
    }
  };
};
