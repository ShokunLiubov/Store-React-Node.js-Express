import { $API } from "../api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../../shared/response/authResponse.interface";
import { IOrder } from "../../shared/interfaces/order.interface";

export class orderService {
  static async getOrders(): Promise<AxiosResponse<IOrder[]>> {
    return $API.get<IOrder[]>("orders");
  }

  static async createOrder(order: IOrder): Promise<AxiosResponse<IOrder[]>> {
    return $API.post<IOrder[]>("orders", order);
  }
}
