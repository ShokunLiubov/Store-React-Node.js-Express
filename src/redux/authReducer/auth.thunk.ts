import { AnyAction, Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { authService } from '../../api/services/auth.service'
import { userService } from '../../api/services/user.service'
import { IAuth } from '../../shared/interfaces/userInterface/auth.interface'
import { IUserInfo } from '../../shared/interfaces/userInterface/userInfo.interface'
import * as AC from './auth.action-creator'

export const registrationUser = (value: IAuth) => {
	return async (dispatch: Dispatch): Promise<string | undefined> => {
		try {
			const response = await authService.registration(value)
			localStorage.setItem('token', response.data.accessToken)
			dispatch(AC.setAuth(response.data.user))
		} catch (e: any) {
			return e.response?.data?.message
		}
	}
}

export const login = (value: IAuth) => {
	return async (dispatch: Dispatch): Promise<string | undefined> => {
		try {
			const response = await authService.login(value)
			localStorage.setItem('token', response.data.accessToken)
			dispatch(AC.setAuth(response.data.user))
		} catch (e: any) {
			return e.response?.data?.message
		}
	}
}

export const logout = () => {
	return async (dispatch: Dispatch): Promise<void> => {
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
	return async (dispatch: Dispatch): Promise<void> => {
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
	return async (dispatch: Dispatch): Promise<void> => {
		const response = await userService.getUserInfoForDelivery()
		dispatch(AC.setUserInfo(response.data))
	}
}

export const updateUserInfo = (value: IUserInfo) => {
	return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
		await userService.updateUserInfoForDelivery(value)
		dispatch(getUserInfo())
	}
}

export const createUserInfo = (value: IUserInfo) => {
	return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
		await userService.createUserInfoForDelivery(value)
		dispatch(getUserInfo())
	}
}
