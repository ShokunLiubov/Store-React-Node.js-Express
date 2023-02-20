import { Dispatch } from 'redux'
import { productService } from '../../api/services/productService'
import { IProduct } from '../../shared/interfaces/product.interface'
import { AppStateType } from '../redux-store'
import * as AC from './productActionCreator'

export const getProducts = (currentPage: number) => {
	return async (dispatch: Dispatch) => {
		const response = await productService.getProducts(currentPage)
		const { docs, page, totalPages } = response.data

		dispatch(AC.setProducts(docs, page, totalPages))
	}
}

export const deleteProduct = (productId: string) => {
	return async (dispatch: any, getState: () => AppStateType) => {
		const { product } = getState()
		await productService.deleteProduct(productId)
		dispatch(getProducts(product.currentPage))
	}
}

export const createNewProduct = (newProduct: IProduct) => {
	return async (dispatch: any, getState: () => AppStateType) => {
		const { product } = getState()
		await productService.createProduct(newProduct)
		dispatch(getProducts(product.currentPage))
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
		await productService.updateProductEdit(productEdit, id)
		dispatch(getProducts(product.currentPage))
	}
}
