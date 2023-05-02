import { AnyAction, Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { categoryService } from '../../api/services/categoryService'
import { classificationService } from '../../api/services/classificationsService'
import { countryTMService } from '../../api/services/countryTMService'
import { madeInService } from '../../api/services/madeInService'
import { productService } from '../../api/services/productService'
import { productStoreService } from '../../api/services/productStoreService'
import { typeAromaService } from '../../api/services/typeAromaService'
import { IFiltersProducts } from '../../shared/filters/filtersProducts.interface'
import { AppStateType } from '../redux-store'
import * as AC from './productActionCreator'

export const getProducts = (
	currentPage: number | string,
	sortField: string,
	sortOrder: string,
	filters: IFiltersProducts | {},
) => {
	return async (dispatch: Dispatch) => {
		const category = await categoryService.getAllCategory()

		dispatch(AC.setCategory(category))
		dispatch(AC.setFilters(filters))
		const response = await productService.getProducts(
			currentPage,
			sortField,
			sortOrder,
			filters,
		)

		const { docs, page, totalPages } = response.data

		dispatch(AC.setProducts(docs, page, totalPages, sortField, sortOrder))
		const classifications = await classificationService.getAllClassifications()
		dispatch(AC.setClassifications(classifications))
		return response.url
	}
}

export const deleteProduct = (productId: string) => {
	return async (
		dispatch: ThunkDispatch<{}, {}, AnyAction>,
		getState: () => AppStateType,
	) => {
		const { product } = getState()
		const { currentPage, sortField, sortOrder } = product
		await productService.deleteProduct(productId)
		dispatch(getProducts(currentPage, sortField, sortOrder, {}))
	}
}

export const createNewProduct = (newProduct: FormData) => {
	return async (
		dispatch: ThunkDispatch<{}, {}, AnyAction>,
		getState: () => AppStateType,
	) => {
		const { product } = getState()
		const { currentPage, sortField, sortOrder } = product
		await productService.createProduct(newProduct)
		dispatch(getProducts(currentPage, sortField, sortOrder, {}))
	}
}

export const editProduct = (productId: string) => {
	return async (dispatch: Dispatch) => {
		const response = await productService.getProductForEdit(productId)
		dispatch(AC.setProductForEdit(response))
	}
}

export const updateProduct = (productEdit: FormData, id: string) => {
	return async (
		dispatch: ThunkDispatch<{}, {}, AnyAction>,
		getState: () => AppStateType,
	) => {
		const { product } = getState()
		const { currentPage, sortField, sortOrder } = product
		await productService.updateProductEdit(productEdit, id)
		dispatch(getProducts(currentPage, sortField, sortOrder, {}))
	}
}

export const getSelectData = () => {
	return async (dispatch: Dispatch) => {
		const categories = await categoryService.getAllCategory()
		dispatch(AC.setCategory(categories))
		const classifications = await classificationService.getAllClassifications()
		dispatch(AC.setClassifications(classifications))
	}
}

export const getProductsOnPage = (id: string) => {
	return async (dispatch: Dispatch) => {
		const payload = await productStoreService.getProductForPage(id)
		dispatch(AC.setProductOnPage(payload))
	}
}

export const getDataForFilters = () => {
	return async (dispatch: Dispatch) => {
		const countryTM = await countryTMService.getAllCountryTM()
		const madeIn = await madeInService.getAllMadeIn()
		const typeAroma = await typeAromaService.getAllTypeAroma()
		const classifications = await classificationService.getAllClassifications()
		const category = await categoryService.getAllCategory()
		dispatch(AC.setCategory(category))
		dispatch(AC.setClassifications(classifications))
		dispatch(AC.setCountryTM(countryTM))
		dispatch(AC.setMadeIn(madeIn))
		dispatch(AC.setTypeAroma(typeAroma))
	}
}
