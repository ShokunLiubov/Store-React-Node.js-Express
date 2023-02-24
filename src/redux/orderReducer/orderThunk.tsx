import { Dispatch } from 'redux'
import { orderService } from '../../api/services/orderService'
import { IProductBasket } from '../../shared/interfaces/productBasket.interface'
import { setEmptyBasket } from '../basketReducer/basketActionCreator'
import { AppStateType } from '../redux-store'
import * as AC from './orderActionCreator'

export const getOrders = (
	currentPage: number,
	sortField: string,
	sortOrder: string,
) => {
	return async (dispatch: Dispatch) => {
		let response = await orderService.getOrders(
			currentPage,
			sortField,
			sortOrder,
		)

		const { docs, page, totalPages } = response.data

		dispatch(AC.setOrders(docs, page, totalPages, sortField, sortOrder))
	}
}

export const createOrder = (togetherPrice: number) => {
	return async (dispatch: Dispatch, getState: () => AppStateType) => {
		try {
			const { basket, user } = getState()

			const { address, fullName } = user.userInfo

			const products = basket.productsBasket.map((product: IProductBasket) => {
				return { productId: product.id, count: product.count }
			})

			const order = {
				products: products,
				fullName: fullName,
				address: address,
				allPrice: togetherPrice,
			}
			await orderService.createOrder(order)
			dispatch(setEmptyBasket())
		} catch (e) {
			console.log(e)
		}
	}
}
