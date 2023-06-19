import { Dispatch } from 'redux'
import { storeService } from '../../api/services/storeService'
import * as AC from './store.action-creator'

export const getStoreHomeProducts = () => {
	return async (dispatch: Dispatch): Promise<void> => {
		const response = await storeService.getStoreHomeProducts()

		dispatch(AC.setStoreHomeProducts(response))
	}
}
