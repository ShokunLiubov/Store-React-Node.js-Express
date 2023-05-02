import { IUserOptions } from '../../shared/interfaces/userInterface/user.interface'
import { IUserInfoOptions } from '../../shared/interfaces/userInterface/userInfo.interface'
import * as actionType from './authActionType'
import * as I from './authInterface'

interface IAuthState {
	user: IUserOptions
	isAuth: boolean
	isLoading: boolean
	userInfo: IUserInfoOptions
}

let initialState: IAuthState = {
	userInfo: {},
	user: {},
	isAuth: false,
	isLoading: false,
}

export const authReducer = (
	state = initialState,
	action: I.IOutAuth | I.ISetAuth | I.ISetLoading | I.ISetUserInfo,
): IAuthState => {
	switch (action.type) {
		case actionType.SET_AUTH:
			if ('payload' in action) {
				return {
					...state,
					user: action.payload,
					isAuth: true,
				}
			}
			break

		case actionType.OUT_AUTH:
			return {
				...state,
				user: {},
				userInfo: {},
				isAuth: false,
			}

		case actionType.SET_LOADING:
			if ('isLoading' in action) {
				return {
					...state,
					isLoading: action.isLoading,
				}
			}
			break

		case actionType.SET_USER_INFO:
			if ('userInfo' in action) {
				return { ...state, userInfo: action.userInfo }
			}
			break

		default:
			break
	}
	return state
}
