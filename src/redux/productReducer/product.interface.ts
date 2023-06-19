import { IFiltersProducts } from '../../shared/filters/filtersProducts.interface'
import { ICategory } from '../../shared/interfaces/productInterface/category.interface'
import { IClassification } from '../../shared/interfaces/productInterface/classification.interface'
import { IProduct } from '../../shared/interfaces/productInterface/product.interface'

export interface ISetProducts {
	type: string
	docs: Array<IProduct>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
}

export interface ISetDeleteProduct {
	type: string
	productId: string
}

export interface ISetProductForEdit {
	type: string
	product: IProduct
}

export interface ISetFilters {
	type: string
	filters: IFiltersProducts | {}
}

export interface ISetCategory {
	type: string
	categories: Array<ICategory>
}

export interface ISetClassifications {
	type: string
	classifications: Array<IClassification>
}

export interface ISetProductOnPage {
	type: string
	payload: IProduct
}

export interface ISetCountryTM {
	type: string
	countryTM: Array<string>
}

export interface ISetMadeIn {
	type: string
	madeIn: Array<string>
}

export interface ISetTypeAroma {
	type: string
	typeAroma: Array<string>
}
