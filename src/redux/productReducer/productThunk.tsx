import { Dispatch } from "redux";
import { productService } from "../../api/services/productService";
import { IProduct } from "../../shared/interfaces/product.interface";
import * as AC from "./productActionCreator";

export const getProducts = () => {
  return async (dispatch: Dispatch) => {
    const response = await productService.getProducts();
    dispatch(AC.setProducts(response.data));
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: any) => {
    await productService.deleteProduct(productId);
    dispatch(getProducts());
  };
};

export const createNewProduct = (newProduct: IProduct) => {
  return async (dispatch: any) => {
    await productService.createProduct(newProduct);
    dispatch(getProducts());
  };
};
