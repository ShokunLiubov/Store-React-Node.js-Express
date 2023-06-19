import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import * as actionType from './basket.action-type'
import * as I from './basket.interface'

export const addProduct = (product: IProductBasket): I.IAddProduct => ({
	type: actionType.ADD_PRODUCT,
	product,
})

export const removeFromBasket = (productId: string): I.IRemoveFromBasket => ({
	type: actionType.REMOVE_PRODUCT,
	productId,
})

export const incrementCount = (productId: string): I.IIncrementCount => ({
	type: actionType.INCREMENT_COUNT_PRODUCT,
	productId,
})

export const decrementCount = (productId: string): I.IDecrementCount => ({
	type: actionType.DECREMENT_COUNT_PRODUCT,
	productId,
})

export const counterSumBasket = (): I.ICounterSumBasket => ({
	type: actionType.COUNTER_SUM_IN_BASKET,
})

export const setEmptyBasket = (): I.ISetEmptyBasket => ({
	type: actionType.SET_EMPTY_BASKET,
})
