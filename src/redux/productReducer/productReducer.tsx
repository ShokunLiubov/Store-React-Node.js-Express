import { IFiltersProducts } from '../../shared/filters/filtersProducts.interface'
import { ICategory } from '../../shared/interfaces/productInterface/category.interface'
import { IClassification } from '../../shared/interfaces/productInterface/classification.interface'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'
import { IProductOptions } from '../../shared/interfaces/productInterface/productOptions.interface'
import * as actionType from './productActionType'
import * as I from './productInterface'

interface IProductState {
	productsData: IProduct[]
	currentPage: number
	totalPages: number
	editProduct: IProduct | {}
	sortField: string
	sortOrder: string
	filters: IFiltersProducts | {}
	categories: Array<ICategory>
	classifications: Array<IClassification>
	productForPage: IProductOptions
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
	filters: {},
	categories: [],
	classifications: [],
	typeAroma: [],
	madeIn: [],
	countryTM: [],
	productForPage: {},
}

export const productReducer = (
	state = initialState,
	action:
		| I.ISetCategory
		| I.ISetClassifications
		| I.ISetCountryTM
		| I.ISetDeleteProduct
		| I.ISetFilters
		| I.ISetMadeIn
		| I.ISetProductForEdit
		| I.ISetProductOnPage
		| I.ISetProducts
		| I.ISetTypeAroma,
): IProductState => {
	switch (action.type) {
		case actionType.SET_PRODUCTS:
			if ('docs' in action) {
				return {
					...state,
					productsData: action.docs,
					currentPage: action.page,
					totalPages: action.totalPages,
					sortField: action.sortField,
					sortOrder: action.sortOrder,
				}
			}
			break

		case actionType.SET_FILTERS_FOR_PRODUCTS:
			if ('filters' in action) {
				return {
					...state,
					filters: action.filters,
				}
			}
			break

		case actionType.SET_CATEGORIES_FOR_PRODUCTS:
			if ('categories' in action) {
				return {
					...state,
					categories: action.categories,
				}
			}
			break

		case actionType.SET_CLASSIFICATIONS_FOR_PRODUCTS:
			if ('classifications' in action) {
				return {
					...state,
					classifications: action.classifications,
				}
			}
			break

		case actionType.DELETE_PRODUCT:
			if ('productId' in action) {
				return {
					...state,
					productsData: state.productsData.filter(
						(product: IProduct) => product._id != action.productId,
					),
				}
			}
			break

		case actionType.SET_PRODUCT_FOR_EDIT:
			if ('product' in action) {
				return {
					...state,
					editProduct: action.product,
				}
			}
			break

		case actionType.SET_PRODUCT_ON_PAGE:
			if ('payload' in action) {
				return {
					...state,
					productForPage: action.payload,
				}
			}
			break

		case actionType.SET_COUNTRY_TM_PRODUCTS:
			if ('countryTM' in action) {
				return {
					...state,
					countryTM: action.countryTM,
				}
			}
			break

		case actionType.SET_MADE_IN_PRODUCTS:
			if ('madeIn' in action) {
				return {
					...state,
					madeIn: action.madeIn,
				}
			}
			break

		case actionType.SET_TYPE_AROMA_PRODUCTS:
			if ('typeAroma' in action) {
				return {
					...state,
					typeAroma: action.typeAroma,
				}
			}
			break

		default:
			break
	}
	return state
}
