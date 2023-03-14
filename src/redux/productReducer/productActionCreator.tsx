import { IFiltersProduct } from '../../shared/filters/filtersProducts.interface'
import { ICategory } from '../../shared/interfaces/productInterface/category.interface'
import { IClassification } from '../../shared/interfaces/productInterface/classification.interface'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
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

export const setFilters = (filters: IFiltersProduct) => ({
	type: actionType.SET_FILTERS_FOR_PRODUCTS,
	filters,
})

export const setCategory = (categories: Array<ICategory>) => ({
	type: actionType.SET_CATEGORIES_FOR_PRODUCTS,
	categories,
})

export const setClassifications = (
	classifications: Array<IClassification>,
) => ({
	type: actionType.SET_CLASSIFICATIONS_FOR_PRODUCTS,
	classifications,
})
