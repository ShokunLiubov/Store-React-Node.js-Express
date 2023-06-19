import { Dispatch } from 'redux'
import { orderService } from '../../api/services/orderService'
import { IFiltersOrders } from '../../shared/filters/filtersOrders.interface'
import { IProductBasket } from '../../shared/interfaces/productInterface/productBasket.interface'
import { setEmptyBasket } from '../basketReducer/basket.action-creator'
import { AppStateType } from '../redux-store'
import * as AC from './order.action-creator'

export const getOrders = (
	currentPage: number | string,
	sortField: string,
	sortOrder: string,
	filters: IFiltersOrders,
) => {
	return async (dispatch: Dispatch): Promise<string> => {
		dispatch(AC.setFiltersOrders(filters))

		let response = await orderService.getOrders(
			currentPage,
			sortField,
			sortOrder,
			filters,
		)
		const { docs, page, totalPages } = response.data

		dispatch(AC.setOrders(docs, page, totalPages, sortField, sortOrder))

		return response.url
	}
}

export const createOrder = (togetherPrice: number) => {
	return async (
		dispatch: Dispatch,
		getState: () => AppStateType,
	): Promise<void> => {
		try {
			let order
			const { basket, auth } = getState()
			const { address, fullName } = auth.userInfo

			const products = basket.productsBasket.map((product: IProductBasket) => {
				return { productId: product.id, count: product.count }
			})

			dispatch(setEmptyBasket())

			if (!fullName) {
				throw new Error('Full name is required for creating an order')
			}

			if (address) {
				order = {
					products: products,
					fullName,
					address,
					allPrice: togetherPrice,
				}
			} else {
				throw new Error('Address name is required for creating an order')
			}

			await orderService.createOrder(order)
		} catch (e) {
			console.log(e)
		}
	}
}

export const getCityForOrders = () => {
	return async (dispatch: Dispatch): Promise<void> => {
		let response = await orderService.getCity()
		dispatch(AC.setCityForOrders(response))
	}
}
