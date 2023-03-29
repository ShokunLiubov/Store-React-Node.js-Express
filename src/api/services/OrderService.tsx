import { AxiosResponse } from 'axios'
import { IOrder } from '../../shared/interfaces/order.interface'
import { $API } from '../api'

export class orderService {
	static async getOrders(
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: any,
	): Promise<any> {
		const { search, dataRange, status, price, city } = filters

		let url = `?page=${page}&limit=15&sortField=${sortField}&sortOrder=${sortOrder}`

		if (search) {
			url += `&search=${search}`
		}

		if (status && status.length) {
			url += `&status=${status}`
		}

		if (city && city.length) {
			url += `&city=${city}`
		}

		if (dataRange && dataRange.selection) {
			const { endDate, startDate } = dataRange.selection
			url += `&dataRange[to]=${endDate}&dataRange[from]=${startDate}`
		}

		if (price) {
			const { $gte, $lte } = price
			if ($gte && $lte) {
				url += `&price[$gte]=${$gte}&price[$lte]=${$lte}`
			}
		}

		const response = await $API.get<any>('orders' + url)
		return { data: response.data, url }
	}

	static async createOrder(order: IOrder): Promise<AxiosResponse<IOrder[]>> {
		return $API.post<IOrder[]>('orders', order)
	}

	static async getCity(): Promise<Array<any>> {
		return $API.get<Array<any>>('orders/city').then(response => response.data)
	}
}
