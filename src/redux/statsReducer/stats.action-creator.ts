import { IOrdersByCity } from '../../shared/stats/ordersByCity.interface'
import { IOrdersByMonth } from '../../shared/stats/ordersByMonth.interface'
import { IRangeDate } from '../../shared/stats/rangeDate.interface'
import * as actionType from './stats.action-type'
import * as I from './stats.interface'

export const setOrdersByMonth = (
	ordersByMonth: Array<IOrdersByMonth>,
): I.ISetOrdersByMonth => ({
	type: actionType.SET_ORDERS_BY_MONTH,
	ordersByMonth,
})

export const setYearsFotStats = (
	years: Array<number>,
): I.ISetYearsFotStats => ({
	type: actionType.SET_YEARS_FOR_STATS,
	years,
})

export const setOrdersByCity = (
	ordersByCity: Array<IOrdersByCity>,
): I.ISetOrdersByCity => ({
	type: actionType.SET_ORDERS_BY_CITY,
	ordersByCity,
})

export const setProfitOverTime = (profit: number): I.ISetProfitOverTime => ({
	type: actionType.SET_PROFIT_OVER_TIME,
	profit,
})

export const setRangeProfit = (range: IRangeDate): I.ISetRangeProfit => ({
	type: actionType.SET_RANGE_PROFIT,
	range,
})
