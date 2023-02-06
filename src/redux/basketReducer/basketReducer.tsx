import { productService } from "../../api/services/productService";
import { IProductBasket } from "../../shared/interfaces/productBasket.interface";

const ADD_PRODUCT: string = "ADD-PRODUCT-IN-BASKET";
const REMOVE_PRODUCT: string = "REMOVE-PRODUCT-IN-BASKET";
const INCREMENT_COUNT_PRODUCT: string = "INCREMENT-COUNT-PRODUCT-IN-BASKET";
const DECREMENT_COUNT_PRODUCT: string = "DECREMENT-COUNT-PRODUCT-IN-BASKET";
const COUNTER_SUM_IN_BASKET: string = "COUNTER-SUM-IN-BASKET";

let initialState: any = {
  productsBasket: [] as IProductBasket[],
  basketSum: 0 as number,
};

export const basketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        productsBasket: [...state.productsBasket, action.product],
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        productsBasket: state.productsBasket.filter(
          (product: IProductBasket) => product.id !== action.productId,
        ),
      };
    case INCREMENT_COUNT_PRODUCT:
      state.productsBasket.map((product: IProductBasket) => {
        if (product.id === action.productId) {
          product.count += 1;
        }
      });

      return {
        ...state,
        productsBasket: [...state.productsBasket],
      };
    case DECREMENT_COUNT_PRODUCT:
      state.productsBasket.map((product: IProductBasket) => {
        if (product.id === action.productId) {
          product.count -= 1;
        }
      });

      return {
        ...state,
        productsBasket: [...state.productsBasket],
      };
    case COUNTER_SUM_IN_BASKET:
      let basketSum = 0;
      state.productsBasket.map((product: IProductBasket) => {
        return (basketSum = basketSum + product.price * product.count);
      });

      return {
        ...state,
        basketSum: basketSum,
      };

    default:
      return state;
  }
};

export const addProduct = (product: IProductBasket) => ({
  type: ADD_PRODUCT,
  product,
});

export const removeFromBasket = (productId: string) => ({
  type: REMOVE_PRODUCT,
  productId,
});

export const incrementCount = (productId: string) => ({
  type: INCREMENT_COUNT_PRODUCT,
  productId,
});

export const decrementCount = (productId: string) => ({
  type: DECREMENT_COUNT_PRODUCT,
  productId,
});

export const counterSumBasket = () => ({
  type: COUNTER_SUM_IN_BASKET,
});

export const deleteProductFromBasket = (productId: string) => {
  return async (dispatch: any) => {
    dispatch(removeFromBasket(productId));
    dispatch(counterSumBasket());
  };
};

export const removeCountProduct = (productId: string) => {
  return async (dispatch: any, getState: any) => {
    const { basket } = getState();

    const productInBasket = basket.productsBasket.find(
      (productBasket: IProductBasket) => productBasket.id === productId,
    );

    if (productInBasket.count === 1) {
      dispatch(removeFromBasket(productId));
    } else {
      dispatch(decrementCount(productId));
    }
    dispatch(counterSumBasket());
  };
};

export const addToBasket = (productId: string) => {
  return async (dispatch: any, getState: any) => {
    const { basket } = getState();

    let productFromDB = await productService.getProduct(productId);

    const productInBasket = basket.productsBasket.find(
      (productBasket: IProductBasket) => productBasket.id === productFromDB.id,
    );

    if (!productInBasket) {
      dispatch(addProduct(productFromDB));
    } else if (productInBasket.available > productInBasket.count) {
      dispatch(incrementCount(productFromDB.id));
    }

    dispatch(counterSumBasket());
  };
};
