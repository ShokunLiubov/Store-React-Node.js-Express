import { IFiltersOrders } from '../../shared/filters/filtersOrders.interface'
import { IOrder } from '../../shared/interfaces/order.interface'
import * as actionType from './orderActionType'

export const setOrders = (
	ordersData: Array<IOrder>,
	page: number,
	totalPages: number,
	sortField: string,
	sortOrder: string,
) => ({
	type: actionType.SET_ORDERS,
	ordersData,
	page,
	totalPages,
	sortField,
	sortOrder,
})

export const setFiltersOrders = (filters: IFiltersOrders) => ({
	type: actionType.SET_FILTERS_FOR_ORDERS,
	filters,
})
