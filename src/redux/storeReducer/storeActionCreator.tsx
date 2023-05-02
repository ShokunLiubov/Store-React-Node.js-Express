import { IStoreHomeProducts } from '../../shared/interfaces/storeInterface/storeHomeProducts.interface'
import * as actionType from './storeActionType'
import * as I from './storeInterface'

export const setStoreHomeProducts = (
	payload: Array<IStoreHomeProducts>,
): I.ISetStoreHomeProducts => ({
	type: actionType.SET_STORE_HOME_PRODUCTS,
	payload,
})
