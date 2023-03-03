import { Dispatch } from 'redux'
import { productService } from '../../api/services/productService'
import { IProduct } from '../../shared/interfaces/product.interface'
import { AppStateType } from '../redux-store'
import * as AC from './productActionCreator'

export const getProducts = (
	currentPage: number,
	sortField: string,
	sortOrder: string,
	filters: any,
) => {
	return async (dispatch: Dispatch) => {
		dispatch(AC.setFilters(filters))
		const response = await productService.getProducts(
			currentPage,
			sortField,
			sortOrder,
			filters,
		)
		const { docs, page, totalPages } = response.data

		dispatch(AC.setProducts(docs, page, totalPages, sortField, sortOrder))
	}
}

export const deleteProduct = (productId: string) => {
	return async (dispatch: any, getState: () => AppStateType) => {
		const { product } = getState()
		const { currentPage, sortField, sortOrder } = product
		await productService.deleteProduct(productId)
		dispatch(getProducts(currentPage, sortField, sortOrder, {}))
	}
}

export const createNewProduct = (newProduct: IProduct) => {
	return async (dispatch: any, getState: () => AppStateType) => {
		const { product } = getState()
		const { currentPage, sortField, sortOrder } = product
		await productService.createProduct(newProduct)
		dispatch(getProducts(currentPage, sortField, sortOrder, {}))
	}
}

export const editProduct = (productId: string) => {
	return async (dispatch: any) => {
		const response = await productService.getProductForEdit(productId)
		dispatch(AC.setProductForEdit(response))
	}
}

export const updateProduct = (productEdit: IProduct, id: string) => {
	return async (dispatch: any, getState: () => AppStateType) => {
		const { product } = getState()
		const { currentPage, sortField, sortOrder } = product
		await productService.updateProductEdit(productEdit, id)
		dispatch(getProducts(currentPage, sortField, sortOrder, {}))
	}
}
