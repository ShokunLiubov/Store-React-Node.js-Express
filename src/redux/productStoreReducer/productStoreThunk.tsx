import { productStoreService } from '../../api/services/productStoreService'
import * as AC from './productStoreActionCreator'

export const getProductsOnPage = (id: string) => {
	return async (dispatch: any) => {
		const payload = await productStoreService.getProductForPage(id)
		dispatch(AC.setProductOnPage(payload))
	}
}
