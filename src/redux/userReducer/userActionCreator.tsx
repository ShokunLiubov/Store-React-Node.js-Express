import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import * as actionType from './userActionType'
import * as I from './userInterface'

export const setUsers = (
	docs: Array<IUser>,
	page: number,
	totalPages: number,
	sortField: string,
	sortOrder: string,
): I.ISetUsers => ({
	type: actionType.SET_USERS,
	docs,
	page,
	totalPages,
	sortField,
	sortOrder,
})

export const setFiltersUsers = (
	filters: IFiltersCustomers,
): I.ISetFiltersUsers => ({
	type: actionType.SET_FILTERS_FOR_USERS,
	filters,
})

export const setCityForUsers = (city: Array<string>): I.ISetCityForUsers => ({
	type: actionType.SET_CITY_FOR_USERS,
	city,
})
