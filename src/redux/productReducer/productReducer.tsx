import { productService } from "../../api/services/ProductService";
import { IProduct } from "../../shared/interfaces/product.interface";

const SET_PRODUCTS: string = "SET-PRODUCTS";
const DELETE_PRODUCT: string = "DELETE-PRODUCT";

let initialState: any = {
  productsData: {} as IProduct[],
};

export const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, productsData: action.productsData };
    case DELETE_PRODUCT:
      return {
        ...state,
        productsData: state.productsData.filter(
          (id: number) => id != action.productId,
        ),
      };
    default:
      return state;
  }
};

export const setProducts = (productsData: Array<IProduct>) => ({
  type: SET_PRODUCTS,
  productsData,
});

export const setDeleteProduct = (productId: number) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const getProducts = () => {
  return async (dispatch: any) => {
    const response = await productService.getProduct();
    dispatch(setProducts(response.data));
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: any) => {
    const response = await productService.deleteProduct(productId);
  };
};

export const createNewProduct = (newProduct: IProduct) => {
  return async (dispatch: any) => {
    const response = await productService.createProduct(newProduct);
  };
};