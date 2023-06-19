import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import * as actionType from './delivery.action-type'
import * as I from './delivery.interface'

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
