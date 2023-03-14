import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import { IUserInfo } from '../../shared/interfaces/userInterface/userInfo.interface'
import * as actionType from './userActionType'

export const setUsers = (
	docs: Array<IUser>,
	page: number,
	totalPages: number,
	sortField: string,
	sortOrder: string,
) => ({
	type: actionType.SET_USERS,
	docs,
	page,
	totalPages,
	sortField,
	sortOrder,
})

export const setUserInfo = (userInfo: IUserInfo) => ({
	type: actionType.SET_USER_INFO,
	userInfo,
})

export const setFiltersUsers = (filters: IFiltersCustomers) => ({
	type: actionType.SET_FILTERS_FOR_USERS,
	filters,
})
