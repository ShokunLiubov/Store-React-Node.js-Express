import { IOrder } from '../../shared/interfaces/order.interface'
import * as actionType from './orderActionType'

export const setOrders = (
	ordersData: Array<IOrder>,
	page: number,
	totalPages: number,
) => ({
	type: actionType.SET_ORDERS,
	ordersData,
	page,
	totalPages,
})
