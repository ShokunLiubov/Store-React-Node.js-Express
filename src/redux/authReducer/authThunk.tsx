import { Dispatch } from 'redux'
import { authService } from '../../api/services/authService'
import { userService } from '../../api/services/userService'
import { IAuth } from '../../shared/interfaces/userInterface/auth.interface'
import { IUserInfo } from '../../shared/interfaces/userInterface/userInfo.interface'
import * as AC from './authActionCreator'

export const registrationUser = (value: IAuth) => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await authService.registration(value)
			localStorage.setItem('token', response.data.accessToken)
			dispatch(AC.setAuth(response.data.user))
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}
}

export const login = (value: IAuth) => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await authService.login(value)
			localStorage.setItem('token', response.data.accessToken)
			dispatch(AC.setAuth(response.data.user))
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}
}

export const logout = (value: IAuth) => {
	return async (dispatch: Dispatch) => {
		try {
			await authService.logout()
			localStorage.removeItem('token')

			dispatch(AC.outAuth())
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}
}

export const checkAuth = () => {
	return async (dispatch: Dispatch) => {
		dispatch(AC.setLoading(true))
		try {
			const response = await authService.refreshToken()

			localStorage.setItem('token', response.data.accessToken)
			dispatch(AC.setAuth(response.data.user))
		} catch (e: any) {
			console.log(e.response?.data?.message)
		} finally {
			dispatch(AC.setLoading(false))
		}
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
