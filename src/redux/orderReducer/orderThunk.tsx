import { Dispatch } from 'redux'
import { orderService } from '../../api/services/orderService'
import { IFiltersOrders } from '../../shared/filters/filtersOrders.interface'
import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import { setEmptyBasket } from '../basketReducer/basketActionCreator'
import { AppStateType } from '../redux-store'
import * as AC from './orderActionCreator'

export const getOrders = (
	currentPage: number,
	sortField: string,
	sortOrder: string,
	filters: IFiltersOrders,
) => {
	return async (dispatch: Dispatch) => {
		dispatch(AC.setFiltersOrders(filters))

		let response = await orderService.getOrders(
			currentPage,
			sortField,
			sortOrder,
			filters,
		)

		const { docs, page, totalPages } = response.data

		dispatch(AC.setOrders(docs, page, totalPages, sortField, sortOrder))
	}
}

export const createOrder = (togetherPrice: number) => {
	return async (dispatch: Dispatch, getState: () => AppStateType) => {
		try {
			const { basket, auth } = getState()

			const { address, fullName } = auth.userInfo

			const products = basket.productsBasket.map((product: IProductBasket) => {
				return { productId: product.id, count: product.count }
			})
			dispatch(setEmptyBasket())

			const order = {
				products: products,
				fullName: fullName,
				address: address,
				allPrice: togetherPrice,
			}
			await orderService.createOrder(order)
		} catch (e) {
			console.log(e)
		}
	}
}
