import { AxiosResponse } from 'axios'
import { IOrder } from '../../shared/interfaces/order.interface'
import { $API } from '../api'

export class orderService {
	static async getOrders(page: number): Promise<AxiosResponse<any>> {
		return $API.get<any>(`orders?page=${page}&limit=25`)
	}

	static async createOrder(order: IOrder): Promise<AxiosResponse<IOrder[]>> {
		return $API.post<IOrder[]>('orders', order)
	}
}
