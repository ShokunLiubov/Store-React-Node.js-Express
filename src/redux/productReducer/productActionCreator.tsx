import { IProduct } from '../../shared/interfaces/product.interface'
import * as actionType from './productActionType'

export const setProducts = (
	productsData: Array<IProduct>,
	page: number,
	totalPages: number,
) => ({
	type: actionType.SET_PRODUCTS,
	productsData,
	page,
	totalPages,
})

export const setDeleteProduct = (productId: string) => ({
	type: actionType.DELETE_PRODUCT,
	productId,
})

export const setProductForEdit = (product: IProduct) => ({
	type: actionType.SET_PRODUCT_FOR_EDIT,
	product,
})
