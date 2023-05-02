import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import * as actionType from './deliveryActionType'
import * as I from './deliveryInterface'

export const setDeliveryOptions = (
	payload: IDeliveryOptions[],
): I.ISetDeliveryOptions => ({
	type: actionType.SET_DELIVERY_OPTIONS,
	payload,
})
