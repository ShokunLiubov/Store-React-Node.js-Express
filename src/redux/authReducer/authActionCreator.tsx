import { IUser } from '../../shared/interfaces/userInterface/user.interface'
import { IUserInfo } from '../../shared/interfaces/userInterface/userInfo.interface'
import * as actionType from './authActionType'

export const setAuth = (payload: IUser) => ({
	type: actionType.SET_AUTH,
	payload,
})

export const outAuth = () => ({ type: actionType.OUT_AUTH })

export const setLoading = (boolean: boolean) => ({
	type: actionType.SET_LOADING,
	boolean,
})

export const setUserInfo = (userInfo: IUserInfo) => ({
	type: actionType.SET_USER_INFO,
	userInfo,
})
