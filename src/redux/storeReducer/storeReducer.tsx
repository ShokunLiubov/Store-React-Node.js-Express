import { AnyAction } from 'redux'
import * as actionType from './storeActionType'

interface IProductState {
	home: Array<any>
}

let initialState: IProductState = {
	home: [],
}

export const storeReducer = (
	state = initialState,
	action: AnyAction,
): IProductState => {
	switch (action.type) {
		case actionType.SET_STORE_HOME_PRODUCTS:
			return {
				...state,
				home: action.payload,
			}

		default:
			return state
	}
}
