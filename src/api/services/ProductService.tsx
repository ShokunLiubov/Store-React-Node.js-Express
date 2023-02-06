import { $API } from "../api";
import { AxiosResponse } from "axios";
import { IProduct } from "../../shared/interfaces/product.interface";
import { IProductBasket } from "../../shared/interfaces/productBasket.interface";

export class productService {
  static async getProducts(): Promise<AxiosResponse<IProduct[]>> {
    return $API.get<IProduct[]>("products");
  }

  static async deleteProduct(productId: string): Promise<AxiosResponse> {
    return $API.delete(`products/${productId}`);
  }

  static async createProduct(newProduct: IProduct): Promise<AxiosResponse> {
    return $API.post("products", newProduct);
  }

  static async getProduct(productId: string): Promise<IProductBasket> {
    return $API.get(`products/${productId}`).then((response) => response.data);
  }
}
