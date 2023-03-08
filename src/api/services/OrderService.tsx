import { AxiosResponse } from 'axios'
import { IOrder } from '../../shared/interfaces/order.interface'
import { $API } from '../api'

export class orderService {
	static async getOrders(
		page: number,
		sortField: string,
		sortOrder: string,
		filters: any,
	): Promise<AxiosResponse<any>> {
		const { search, createdAt, status, price, city } = filters

		let url = `orders?page=${page}&limit=15&sortField=${sortField}&sortOrder=${sortOrder}`
		if (search) {
			url += `&search=${search}`
		}
		if (status) {
			url += `&status=${status}`
		}
		if (city) {
			url += `&city=${city}`
		}
		if (createdAt) {
			if (createdAt.selection) {
				const { endDate, startDate } = createdAt.selection
				if (endDate && startDate) {
					url += `&createdAt[endDate]=${endDate}&createdAt[startDate]=${startDate}`
				}
			}
		}
		if (price) {
			const { $gte, $lte } = price
			if ($gte && $lte) {
				url += `&price[$gte]=${$gte}&price[$lte]=${$lte}`
			}
		}

		return $API.get<any>(url)
	}

	static async createOrder(order: IOrder): Promise<AxiosResponse<IOrder[]>> {
		return $API.post<IOrder[]>('orders', order)
	}
}
