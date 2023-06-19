import { Dispatch } from 'redux'
import { deliveryService } from '../../api/services/delivery.service'
import { IDeliveryPrice } from '../../shared/interfaces/deliveryInterface/deliveryPrice.interface'
import * as AC from './delivery.action-creator'

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
