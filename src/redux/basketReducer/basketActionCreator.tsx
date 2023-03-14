import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import * as actionType from './basketActionType'

export const addProduct = (product: IProductBasket) => ({
	type: actionType.ADD_PRODUCT,
	product,
})

export const removeFromBasket = (productId: string) => ({
	type: actionType.REMOVE_PRODUCT,
	productId,
})

export const incrementCount = (productId: string) => ({
	type: actionType.INCREMENT_COUNT_PRODUCT,
	productId,
})

export const decrementCount = (productId: string) => ({
	type: actionType.DECREMENT_COUNT_PRODUCT,
	productId,
})

export const counterSumBasket = () => ({
	type: actionType.COUNTER_SUM_IN_BASKET,
})

export const setEmptyBasket = () => ({
	type: actionType.SET_EMPTY_BASKET,
})
