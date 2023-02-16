import { AnyAction } from 'redux'
import { IProduct } from '../../shared/interfaces/product.interface'
import * as actionType from './productActionType'

interface IProductState {
	productsData: IProduct[]
	currentPage: number
	totalPages: number
}

let initialState: IProductState = {
	productsData: [],
	currentPage: 1,
	totalPages: 0,
}

export const productReducer = (
	state = initialState,
	action: AnyAction,
): IProductState => {
	switch (action.type) {
		case actionType.SET_PRODUCTS:
			return {
				...state,
				productsData: action.productsData,
				currentPage: action.page,
				totalPages: action.totalPages,
			}

		case actionType.DELETE_PRODUCT:
			return {
				...state,
				productsData: state.productsData.filter(
					(product: IProduct) => product._id != action.productId,
				),
			}
		default:
			return state
	}
}
