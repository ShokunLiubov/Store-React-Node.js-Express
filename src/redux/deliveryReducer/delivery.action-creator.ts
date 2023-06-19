import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import * as actionType from './delivery.action-type'
import * as I from './delivery.interface'

export const setDeliveryOptions = (
	payload: IDeliveryOptions[],
): I.ISetDeliveryOptions => ({
	type: actionType.SET_DELIVERY_OPTIONS,
	payload,
})
