import { AnyAction } from 'redux'
import * as actionType from './productStoreActionType'

interface IProductState {
	productForPage: any
}

let initialState: IProductState = {
	productForPage: {},
}

export const productStoreReducer = (
	state = initialState,
	action: AnyAction,
): IProductState => {
	switch (action.type) {
		case actionType.SET_PRODUCT_ON_PAGE:
			return {
				...state,
				productForPage: action.payload,
			}

		default:
			return state
	}
}
