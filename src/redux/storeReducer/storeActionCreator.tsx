import * as actionType from './storeActionType'

export const setStoreHomeProducts = (payload: Array<any>) => ({
	type: actionType.SET_STORE_HOME_PRODUCTS,
	payload,
})
