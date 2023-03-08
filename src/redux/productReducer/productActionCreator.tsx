import { IProduct } from '../../shared/interfaces/product.interface'
import * as actionType from './productActionType'

export const setProducts = (
	docs: Array<IProduct>,
	page: number,
	totalPages: number,
	sortField: string,
	sortOrder: string,
) => ({
	type: actionType.SET_PRODUCTS,
	docs,
	page,
	totalPages,
	sortField,
	sortOrder,
})

export const setDeleteProduct = (productId: string) => ({
	type: actionType.DELETE_PRODUCT,
	productId,
})

export const setProductForEdit = (product: IProduct) => ({
	type: actionType.SET_PRODUCT_FOR_EDIT,
	product,
})

export const setFilters = (filters: any) => ({
	type: actionType.SET_FILTERS_FOR_PRODUCTS,
	filters,
})

export const setCategory = (categories: any) => ({
	type: actionType.SET_CATEGORIES_FOR_PRODUCTS,
	categories,
})

export const setClassifications = (classifications: any) => ({
	type: actionType.SET_CLASSIFICATIONS_FOR_PRODUCTS,
	classifications,
})
