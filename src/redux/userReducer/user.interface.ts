import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import { IUser } from '../../shared/interfaces/userInterface/user.interface'

export interface ISetUsers {
	type: string
	docs: Array<IUser>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
}

export interface ISetFiltersUsers {
	type: string
	filters: IFiltersCustomers
}

export interface ISetCityForUsers {
	type: string
	city: Array<string>
}
