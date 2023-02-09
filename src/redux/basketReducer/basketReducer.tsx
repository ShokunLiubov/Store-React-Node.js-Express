import { AnyAction } from "redux";
import { IProductBasket } from "../../shared/interfaces/productBasket.interface";
import * as actionType from "./basketActionType";

interface IBasketState {
  productsBasket: IProductBasket[];
  basketSum: number;
}

let initialState: IBasketState = {
  productsBasket: [],
  basketSum: 0,
};

export const basketReducer = (
  state = initialState,
  action: AnyAction,
): IBasketState => {
  switch (action.type) {
    case actionType.ADD_PRODUCT:
      return {
        ...state,
        productsBasket: [...state.productsBasket, action.product],
      };
    case actionType.REMOVE_PRODUCT:
      return {
        ...state,
        productsBasket: state.productsBasket.filter(
          (product: IProductBasket) => product.id !== action.productId,
        ),
      };
    case actionType.INCREMENT_COUNT_PRODUCT:
      state.productsBasket.map((product: IProductBasket) => {
        if (product.id === action.productId) {
          product.count += 1;
        }
      });

      return {
        ...state,
        productsBasket: [...state.productsBasket],
      };
    case actionType.DECREMENT_COUNT_PRODUCT:
      state.productsBasket.map((product: IProductBasket) => {
        if (product.id === action.productId) {
          product.count -= 1;
        }
      });

      return {
        ...state,
        productsBasket: [...state.productsBasket],
      };
    case actionType.COUNTER_SUM_IN_BASKET:
      let basketSum = 0;
      state.productsBasket.map((product: IProductBasket) => {
        return (basketSum = basketSum + product.price * product.count);
      });

      return {
        ...state,
        basketSum: basketSum,
      };
    case actionType.SET_EMPTY_BASKET:
      return {
        ...state,
        productsBasket: [],
        basketSum: 0,
      };
    default:
      return state;
  }
};
