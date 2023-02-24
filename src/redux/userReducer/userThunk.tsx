import { Dispatch } from 'redux'
import { userService } from '../../api/services/userService'
import { IUserInfo } from '../../shared/interfaces/userInfo.interface'
import * as AC from './userActionCreator'

export const getUsers = (
	currentPage: number,
	sortField: string,
	sortOrder: string,
) => {
	return async (dispatch: Dispatch) => {
		const response = await userService.fetchUsers(
			currentPage,
			sortField,
			sortOrder,
		)

		const { docs, page, totalPages } = response.data
		dispatch(AC.setUsers(docs, page, totalPages, sortField, sortOrder))
	}
}

export const getUserInfo = () => {
	return async (dispatch: Dispatch) => {
		const response = await userService.getUserInfoForDelivery()
		dispatch(AC.setUserInfo(response.data))
	}
}

export const updateUserInfo = (value: IUserInfo) => {
	return async (dispatch: any) => {
		await userService.updateUserInfoForDelivery(value)
		dispatch(getUserInfo())
	}
}

export const createUserInfo = (value: IUserInfo) => {
	return async (dispatch: any) => {
		await userService.createUserInfoForDelivery(value)
		dispatch(getUserInfo())
	}
}
