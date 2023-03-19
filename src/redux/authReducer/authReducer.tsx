import { AnyAction } from 'redux'
import * as actionType from './authActionType'

interface IAuthState {
	user: any
	isAuth: boolean
	isLoading: boolean
	userInfo: any
}

let initialState: IAuthState = {
	userInfo: {},
	user: {},
	isAuth: false,
	isLoading: false,
}

export const authReducer = (
	state = initialState,
	action: AnyAction,
): IAuthState => {
	switch (action.type) {
		case actionType.SET_AUTH:
			return {
				...state,
				user: action.payload,
				isAuth: true,
			}
		case actionType.OUT_AUTH:
			return {
				...state,
				user: {},
				userInfo: {},
				isAuth: false,
			}
		case actionType.SET_LOADING:
			return {
				...state,
				isLoading: action.boolean,
			}
		case actionType.SET_USER_INFO:
			return { ...state, userInfo: action.userInfo }
		default:
			return state
	}
}
