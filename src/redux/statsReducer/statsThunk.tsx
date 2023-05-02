import { Dispatch } from 'redux'
import { statsService } from '../../api/services/statsService'
import { ICalendarRange } from '../../shared/interfaces/common/calendarRange.interface'
import * as AC from './statsActionCreator'

export const getStatsForOrders = (year: number) => {
	return async (dispatch: Dispatch): Promise<string> => {
		const ordersByMonthResponse = await statsService.getOrdersByMonth(year)
		const ordersByCityResponse = await statsService.getOrdersByCity(year)
		const profitResponse = await statsService.getProfitOverTime({}, year)

		dispatch(AC.setOrdersByMonth(ordersByMonthResponse.data))
		dispatch(AC.setOrdersByCity(ordersByCityResponse.data))
		dispatch(AC.setRangeProfit(profitResponse.date))
		dispatch(AC.setProfitOverTime(profitResponse.profit.totalProfit))

		return ordersByMonthResponse.url
	}
}

export const getProfit = (dataRange: ICalendarRange) => {
	return async (dispatch: Dispatch): Promise<void> => {
		const response = await statsService.getProfitOverTime(dataRange)
		dispatch(AC.setRangeProfit(response.date))
		dispatch(AC.setProfitOverTime(response.profit.totalProfit))
	}
}

export const getYearsForStats = () => {
	return async (dispatch: Dispatch): Promise<void> => {
		const response = await statsService.getYearForStats()
		dispatch(AC.setYearsFotStats(response))
	}
}
