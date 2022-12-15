import { $API } from "../api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../../shared/response/authResponse.interface";
import { IOrder } from "../../shared/interfaces/order.interface";

export class orderService {
  static async getOrders(): Promise<AxiosResponse<IOrder[]>> {
    return $API.get<IOrder[]>("orders");
  }
}
