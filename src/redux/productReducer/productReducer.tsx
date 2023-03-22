import { AnyAction } from 'redux'
import { IFiltersProducts } from '../../shared/filters/filtersProducts.interface'
import { ICategory } from '../../shared/interfaces/productInterface/category.interface'
import { IClassification } from '../../shared/interfaces/productInterface/classification.interface'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import * as actionType from './productActionType'

interface IProductState {
	productsData: IProduct[]
	currentPage: number
	totalPages: number
	editProduct: any
	sortField: string
	sortOrder: string
	filters: IFiltersProducts
	categories: Array<ICategory>
	classifications: Array<IClassification>
	productForPage: any
	countryTM: Array<string>
	madeIn: Array<string>
	typeAroma: Array<string>
}

let initialState: IProductState = {
	productsData: [],
	currentPage: 1,
	totalPages: 0,
	editProduct: {},
	sortField: '_id',
	sortOrder: 'asc',
	filters: {
		category: [],
		classification: [],
		type_of_aroma: [],
		made_in: [],
		country_of_TM: [],
	},
	categories: [],
	classifications: [],
	typeAroma: [],
	madeIn: [],
	countryTM: [],
	productForPage: {},
}

export const productReducer = (
	state = initialState,
	action: AnyAction,
): IProductState => {
	switch (action.type) {
		case actionType.SET_PRODUCTS:
			return {
				...state,
				productsData: action.docs,
				currentPage: action.page,
				totalPages: action.totalPages,
				sortField: action.sortField,
				sortOrder: action.sortOrder,
			}
		case actionType.SET_FILTERS_FOR_PRODUCTS:
			return {
				...state,
				filters: action.filters,
			}
		case actionType.SET_CATEGORIES_FOR_PRODUCTS:
			return {
				...state,
				categories: action.categories,
			}
		case actionType.SET_CLASSIFICATIONS_FOR_PRODUCTS:
			return {
				...state,
				classifications: action.classifications,
			}
		case actionType.DELETE_PRODUCT:
			return {
				...state,
				productsData: state.productsData.filter(
					(product: IProduct) => product._id != action.productId,
				),
			}
		case actionType.SET_PRODUCT_FOR_EDIT:
			return {
				...state,
				editProduct: action.product,
			}
		case actionType.SET_PRODUCT_ON_PAGE:
			return {
				...state,
				productForPage: action.payload,
			}

		case actionType.SET_COUNTRY_TM_PRODUCTS:
			return {
				...state,
				countryTM: action.countryTM,
			}
		case actionType.SET_MADE_IN_PRODUCTS:
			return {
				...state,
				madeIn: action.madeIn,
			}
		case actionType.SET_TYPE_AROMA_PRODUCTS:
			return {
				...state,
				typeAroma: action.typeAroma,
			}

		default:
			return state
	}
}
