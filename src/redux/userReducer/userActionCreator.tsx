import { IUser } from '../../shared/interfaces/user.interface'
import { IUserInfo } from '../../shared/interfaces/userInfo.interface'
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
