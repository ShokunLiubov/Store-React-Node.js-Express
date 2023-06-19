import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import { IUserInfo } from '../../shared/interfaces/userInterface/userInfo.interface'
import * as actionType from './auth.action-type'
import * as I from './auth.interface'

export const setAuth = (payload: IUser): I.ISetAuth => ({
	type: actionType.SET_AUTH,
	payload,
})

export const outAuth = (): I.IOutAuth => ({ type: actionType.OUT_AUTH })

export const setLoading = (isLoading: boolean): I.ISetLoading => ({
	type: actionType.SET_LOADING,
	isLoading,
})

export const setUserInfo = (userInfo: IUserInfo): I.ISetUserInfo => ({
	type: actionType.SET_USER_INFO,
	userInfo,
})
