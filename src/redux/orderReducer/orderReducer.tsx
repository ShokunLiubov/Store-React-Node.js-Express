import { AnyAction } from 'redux'
import { IOrder } from '../../shared/interfaces/order.interface'
import * as actionType from './orderActionType'

interface IOrderState {
	ordersData: IOrder[]
	currentPage: number
	totalPages: number
}

let initialState: IOrderState = {
	ordersData: [],
	currentPage: 1,
	totalPages: 0,
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
			}

		default:
			return state
	}
}
