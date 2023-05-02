import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import * as actionType from './deliveryActionType'
import * as I from './deliveryInterface'

interface IDeliveryState {
	deliveryOptions: Array<IDeliveryOptions>
}

let initialState: IDeliveryState = {
	deliveryOptions: [],
}

export const deliveryReducer = (
	state = initialState,
	action: I.ISetDeliveryOptions,
): IDeliveryState => {
	switch (action.type) {
		case actionType.SET_DELIVERY_OPTIONS:
			if ('payload' in action) {
				return {
					...state,
					deliveryOptions: action.payload,
				}
			}
			break

		default:
			break
	}
	return state
}
