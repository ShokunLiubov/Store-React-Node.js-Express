import { Dispatch } from 'redux'
import { storeService } from '../../api/services/storeService'
import * as AC from './storeActionCreator'

export const getStoreHomeProducts = () => {
	return async (dispatch: Dispatch) => {
		const response = await storeService.getStoreHomeProducts()
		dispatch(AC.setStoreHomeProducts(response))
	}
}
