import { IFiltersOrders } from '../../shared/filters/filtersOrders.interface'
import { IOrder } from '../../shared/interfaces/order.interface'
import * as actionType from './order.action-type'
import * as I from './order.interface'

export const setOrders = (
	ordersData: Array<IOrder>,
	page: number,
	totalPages: number,
	sortField: string,
	sortOrder: string,
): I.ISetOrders => ({
	type: actionType.SET_ORDERS,
	ordersData,
	page,
	totalPages,
	sortField,
	sortOrder,
})

export const setFiltersOrders = (
	filters: IFiltersOrders,
): I.ISetFiltersOrders => ({
	type: actionType.SET_FILTERS_FOR_ORDERS,
	filters,
})

export const setCityForOrders = (city: Array<string>): I.ISetCityForOrders => ({
	type: actionType.SET_CITY_FOR_ORDERS,
	city,
})
