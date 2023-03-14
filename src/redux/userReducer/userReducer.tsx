import { AnyAction } from 'redux'
import { IFiltersCustomers } from '../../shared/filters/filtersCustomers.interface'
import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import * as actionType from './userActionType'

interface IUserState {
	usersData: IUser[]
	userInfo: any
	currentPage: number
	totalPages: number
	sortField: string
	sortOrder: string
	filters: IFiltersCustomers
}

let initialState: IUserState = {
	usersData: [],
	userInfo: {},
	currentPage: 1,
	totalPages: 0,
	sortField: '_id',
	sortOrder: 'asc',
	filters: {
		city: [],
	},
}

export const userReducer = (
	state = initialState,
	action: AnyAction,
): IUserState => {
	switch (action.type) {
		case actionType.SET_USERS:
			return {
				...state,
				usersData: action.docs,
				currentPage: action.page,
				totalPages: action.totalPages,
				sortField: action.sortField,
				sortOrder: action.sortOrder,
			}

		case actionType.SET_USER_INFO:
			return { ...state, userInfo: action.userInfo }
		case actionType.SET_FILTERS_FOR_USERS:
			return {
				...state,
				filters: action.filters,
			}
		default:
			return state
	}
}
