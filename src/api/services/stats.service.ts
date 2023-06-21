import { ICalendarRange } from '../../shared/interfaces/common/calendarRange.interface'
import { IProfitResponse } from '../../shared/response/profitResponse.interface'
import { IOrdersByCity } from '../../shared/stats/ordersByCity.interface'
import { IOrdersByMonth } from '../../shared/stats/ordersByMonth.interface'
import { $API } from '../api'

const STATS = 'stats/'

export class statsService {
	static async getOrdersByMonth(
		year: number,
	): Promise<{ data: IOrdersByMonth[]; url: string }> {
		let url = `?year=${year}`

		const response = await $API.get(`${STATS}orders/month` + url)
		return { data: response.data, url }
	}

	static async getOrdersByCity(
		year: number,
	): Promise<{ data: IOrdersByCity[] }> {
		let url = `?year=${year}`

		const response = await $API.get(`${STATS}orders/city` + url)
		return { data: response.data }
	}

	static async getProfitOverTime(
		dataRange: ICalendarRange,
		year?: number,
	): Promise<IProfitResponse> {
		let url = ''

		if (dataRange && dataRange.selection) {
			const { endDate, startDate } = dataRange.selection
			url += `dataRange[to]=${endDate}&dataRange[from]=${startDate}`
		}

		if (year) {
			url += `&year=${year}`
		}

		const response = await $API.get(`${STATS}profit?` + url)

		return response.data
	}

	static async getYearForStats(): Promise<Array<number>> {
		return $API.get(`${STATS}years`).then(response => response.data)
	}
}
