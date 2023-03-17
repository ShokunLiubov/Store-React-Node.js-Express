import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import * as actionType from './productStoreActionType'

export const setProductOnPage = (payload: IProduct) => ({
	type: actionType.SET_PRODUCT_ON_PAGE,
	payload,
})
