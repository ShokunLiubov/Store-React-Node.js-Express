import { IStoreHomeProducts } from '../../shared/interfaces/storeInterface/storeHomeProducts.interface'
import * as actionType from './store.action-type'
import * as I from './store.interface'

export const setStoreHomeProducts = (
	payload: Array<IStoreHomeProducts>,
): I.ISetStoreHomeProducts => ({
	type: actionType.SET_STORE_HOME_PRODUCTS,
	payload,
})
