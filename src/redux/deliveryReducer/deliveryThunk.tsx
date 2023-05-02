import { Dispatch } from 'redux'
import { deliveryService } from '../../api/services/deliveryService'
import { IDeliveryPrice } from '../../shared/interfaces/deliveryInterface/deliveryPrice.interface'
import * as AC from './deliveryActionCreator'

export const getDeliveryOptions = () => {
	return async (dispatch: Dispatch): Promise<void> => {
		const payload = await deliveryService.getDeliveryOptions()

		dispatch(AC.setDeliveryOptions(payload))
	}
}

export const setPriceDelivery = (payload: IDeliveryPrice) => {
	return async (dispatch: Dispatch): Promise<void> => {
		await deliveryService.setDeliveryPrice(payload)
	}
}
