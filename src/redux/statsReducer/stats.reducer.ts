import { IOrdersByCity } from '../../shared/stats/ordersByCity.interface'
import { IOrdersByMonth } from '../../shared/stats/ordersByMonth.interface'
import { IRangeDate } from '../../shared/stats/rangeDate.interface'
import * as actionType from './stats.action-type'
import * as I from './stats.interface'

interface IDeliveryState {
	ordersByMonth: Array<IOrdersByMonth>
	ordersByCity: Array<IOrdersByCity>
	years: Array<number>
	profit: number
	range: IRangeDate
}

let initialState: IDeliveryState = {
	ordersByMonth: [],
	ordersByCity: [],
	years: [],
	profit: 0,
	range: {},
}

export const statsReducer = (
	state = initialState,
	action:
		| I.ISetOrdersByCity
		| I.ISetOrdersByMonth
		| I.ISetProfitOverTime
		| I.ISetRangeProfit
		| I.ISetYearsFotStats,
): IDeliveryState => {
	switch (action.type) {
		case actionType.SET_ORDERS_BY_MONTH:
			if ('ordersByMonth' in action) {
				return {
					...state,
					ordersByMonth: action.ordersByMonth,
				}
			}
			break

		case actionType.SET_YEARS_FOR_STATS:
			if ('years' in action) {
				return {
					...state,
					years: action.years,
				}
			}
			break

		case actionType.SET_ORDERS_BY_CITY:
			if ('ordersByCity' in action) {
				return {
					...state,
					ordersByCity: action.ordersByCity,
				}
			}
			break

		case actionType.SET_PROFIT_OVER_TIME:
			if ('profit' in action) {
				return {
					...state,
					profit: action.profit,
				}
			}
			break

		case actionType.SET_RANGE_PROFIT:
			if ('range' in action) {
				return {
					...state,
					range: action.range,
				}
			}
			break

		default:
			break
	}
	return state
}
