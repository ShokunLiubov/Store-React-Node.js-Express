import { $API } from "../api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../../shared/response/authResponse.interface";
import { IProduct } from "../../shared/interfaces/product.interface";

export class productService {
  static async getProduct(): Promise<AxiosResponse<IProduct[]>> {
    return $API.get<IProduct[]>("products");
  }

  static async deleteProduct(productId: string): Promise<AxiosResponse> {
    return $API.delete(`products/${productId}`);
  }

  static async createProduct(newProduct: IProduct): Promise<AxiosResponse> {
    return $API.post("products", newProduct);
  }
}
