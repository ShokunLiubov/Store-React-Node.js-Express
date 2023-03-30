import { AnyAction } from 'redux'
import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import * as actionType from './deliveryActionType'

interface IDeliveryState {
	deliveryOptions: Array<IDeliveryOptions>
}

let initialState: IDeliveryState = {
	deliveryOptions: [],
}

export const deliveryReducer = (
	state = initialState,
	action: AnyAction,
): IDeliveryState => {
	switch (action.type) {
		case actionType.SET_DELIVERY_OPTIONS:
			return {
				...state,
				deliveryOptions: action.payload,
			}
		default:
			return state
	}
}
