import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import { IUserInfoOptions } from '../../shared/interfaces/userInterface/userInfo.interface'
import * as actionType from './userActionType'
import * as I from './userInterface'

interface IUserState {
	usersData: IUser[]
	userInfo: IUserInfoOptions
	currentPage: number
	totalPages: number
	sortField: string
	sortOrder: string
	filters: IFiltersCustomers
	city: Array<string>
}

let initialState: IUserState = {
	usersData: [],
	userInfo: {},
	currentPage: 1,
	totalPages: 0,
	sortField: '_id',
	sortOrder: '1',
	filters: {
		city: [],
	},
	city: [],
}

export const userReducer = (
	state = initialState,
	action: I.ISetCityForUsers | I.ISetFiltersUsers | I.ISetUsers,
): IUserState => {
	switch (action.type) {
		case actionType.SET_USERS:
			if ('sortOrder' in action) {
				return {
					...state,
					usersData: action.docs,
					currentPage: action.page,
					totalPages: action.totalPages,
					sortField: action.sortField,
					sortOrder: action.sortOrder,
				}
			}
			break

		case actionType.SET_FILTERS_FOR_USERS:
			if ('filters' in action) {
				return {
					...state,
					filters: action.filters,
				}
			}
			break

		case actionType.SET_CITY_FOR_USERS:
			if ('city' in action) {
				return {
					...state,
					city: action.city,
				}
			}
			break

		default:
			break
	}
	return state
}
