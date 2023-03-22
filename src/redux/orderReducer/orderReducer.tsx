import { AnyAction } from 'redux'
import { IFiltersOrders } from '../../shared/filters/filtersOrders.interface'
import { IOrder } from '../../shared/interfaces/order.interface'
import * as actionType from './orderActionType'

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
	action: AnyAction,
): IOrderState => {
	switch (action.type) {
		case actionType.SET_ORDERS:
			return {
				...state,
				ordersData: action.ordersData,
				currentPage: action.page,
				totalPages: action.totalPages,
				sortField: action.sortField,
				sortOrder: action.sortOrder,
			}
		case actionType.SET_FILTERS_FOR_ORDERS:
			return {
				...state,
				filters: action.filters,
			}
		case actionType.SET_CITY_FOR_ORDERS:
			return {
				...state,
				city: action.city,
			}
		default:
			return state
	}
}
