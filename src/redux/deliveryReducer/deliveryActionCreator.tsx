import * as actionType from './deliveryActionType'

export const setDeliveryOptions = (payload: any) => ({
	type: actionType.SET_DELIVERY_OPTIONS,
	payload,
})
