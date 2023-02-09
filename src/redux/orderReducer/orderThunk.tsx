import { IProductBasket } from "../../shared/interfaces/productBasket.interface";
import * as AC from "./orderActionCreator";
import { Dispatch } from "redux";
import { orderService } from "../../api/services/orderService";
import { setEmptyBasket } from "../basketReducer/basketActionCreator";
import { AppStateType } from "../redux-store";

export const getOrders = () => {
  return async (dispatch: Dispatch) => {
    let response = await orderService.getOrders();

    dispatch(AC.setOrders(response.data));
  };
};

export const createOrder = (togetherPrice: number) => {
  return async (dispatch: Dispatch, getState: () => AppStateType) => {
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
