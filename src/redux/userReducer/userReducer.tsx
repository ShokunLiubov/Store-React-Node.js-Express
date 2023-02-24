import { AnyAction } from 'redux'
import { IUser } from '../../shared/interfaces/user.interface'
import * as actionType from './userActionType'

interface IUserState {
	usersData: IUser[]
	userInfo: any
	currentPage: number
	totalPages: number
	sortField: string
	sortOrder: string
}

let initialState: IUserState = {
	usersData: [],
	userInfo: {},
	currentPage: 1,
	totalPages: 0,
	sortField: '_id',
	sortOrder: 'asc',
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
		default:
			return state
	}
}
