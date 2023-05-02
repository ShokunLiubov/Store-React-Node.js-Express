import { IStoreHomeProducts } from '../../shared/interfaces/storeInterface/storeHomeProducts.interface'
import * as actionType from './storeActionType'
import * as I from './storeInterface'

interface IProductState {
	home: Array<IStoreHomeProducts>
}

let initialState: IProductState = {
	home: [],
}

export const storeReducer = (
	state = initialState,
	action: I.ISetStoreHomeProducts,
): IProductState => {
	switch (action.type) {
		case actionType.SET_STORE_HOME_PRODUCTS:
			if ('payload' in action) {
				return {
					...state,
					home: action.payload,
				}
			}
			break

		default:
			break
	}
	return state
}
