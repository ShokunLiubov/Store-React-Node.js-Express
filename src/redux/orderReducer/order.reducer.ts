import { IFiltersOrders } from '../../shared/filters/filtersOrders.interface'
import { IOrder } from '../../shared/interfaces/order.interface'
import * as actionType from './order.action-type'
import * as I from './order.interface'

interface IOrderState {
	ordersData: IOrder[]
	currentPage: number
	totalPages: number
	sortField: string
	sortOrder: string
	filters: IFiltersOrders
	city: Array<string>
}

let initialState: IOrderState = {
	ordersData: [],
	currentPage: 1,
	totalPages: 0,
	sortField: 'createdAt',
	sortOrder: 'desc',
	filters: {
		city: [],
		status: [],
	},
	city: [],
}

export const orderReducer = (
	state = initialState,
	action: I.ISetCityForOrders | I.ISetFiltersOrders | I.ISetOrders,
): IOrderState => {
	switch (action.type) {
		case actionType.SET_ORDERS:
			if ('ordersData' in action) {
				return {
					...state,
					ordersData: action.ordersData,
					currentPage: action.page,
					totalPages: action.totalPages,
					sortField: action.sortField,
					sortOrder: action.sortOrder,
				}
			}
			break

		case actionType.SET_FILTERS_FOR_ORDERS:
			if ('filters' in action) {
				return {
					...state,
					filters: action.filters,
				}
			}
			break

		case actionType.SET_CITY_FOR_ORDERS:
			if ('city' in action) {
				return {
					...state,
					city: action.city,
				}
			}
			break

		default:
			break
	}
	return state
}
