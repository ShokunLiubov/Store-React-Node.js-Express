import { Dispatch } from 'redux'
import { productService } from '../../api/services/productService'
import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import { AppStateType } from '../redux-store'
import * as AC from './basketActionCreator'

export const deleteProductFromBasket = (productId: string) => {
	return async (dispatch: Dispatch): Promise<void> => {
		dispatch(AC.removeFromBasket(productId))
		dispatch(AC.counterSumBasket())
	}
}

export const removeCountProduct = (productId: string) => {
	return async (
		dispatch: Dispatch,
		getState: () => AppStateType,
	): Promise<void> => {
		const { basket } = getState()

		const productInBasket = basket.productsBasket.find(
			(productBasket: IProductBasket) => productBasket.id === productId,
		)

		if (productInBasket && productInBasket.count === 1) {
			dispatch(AC.removeFromBasket(productId))
		} else {
			dispatch(AC.decrementCount(productId))
		}
		dispatch(AC.counterSumBasket())
	}
}

export const addToBasket = (productId: string) => {
	return async (
		dispatch: Dispatch,
		getState: () => AppStateType,
	): Promise<void> => {
		const { basket } = getState()

		let productFromDB = await productService.getProduct(productId)

		const productInBasket = basket.productsBasket.find(
			(productBasket: IProductBasket) => productBasket.id === productFromDB.id,
		)

		if (!productInBasket) {
			dispatch(AC.addProduct(productFromDB))
		} else if (productInBasket.available > productInBasket.count) {
			dispatch(AC.incrementCount(productFromDB.id))
		}

		dispatch(AC.counterSumBasket())
	}
}
