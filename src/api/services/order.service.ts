import { AxiosResponse } from 'axios'
import { IFiltersOrders } from '../../shared/filters/filtersOrders.interface'
import { IOrder } from '../../shared/interfaces/order.interface'
import { IOrdersResponse } from '../../shared/response/orderResponse.interface'
import { $API } from '../api'

const ORDERS = 'orders/'

export class orderService {
	static async getOrders(
		page: number | string,
		sortField: string,
		sortOrder: string,
		filters: IFiltersOrders,
	): Promise<{ data: IOrdersResponse; url: string }> {
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

		const response = await $API.get(ORDERS + url)
		return { data: response.data, url }
	}

	static async createOrder(data: IOrder): Promise<AxiosResponse<IOrder[]>> {
		return $API.post<IOrder[]>(ORDERS, data)
	}

	static async getCity(): Promise<Array<string>> {
		return $API.get(`${ORDERS}city`).then(response => response.data)
	}
}
