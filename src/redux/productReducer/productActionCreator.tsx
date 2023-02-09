import * as actionType from "./productActionType";
import { IProduct } from "../../shared/interfaces/product.interface";

export const setProducts = (productsData: Array<IProduct>) => ({
  type: actionType.SET_PRODUCTS,
  productsData,
});

export const setDeleteProduct = (productId: number) => ({
  type: actionType.DELETE_PRODUCT,
  productId,
});
