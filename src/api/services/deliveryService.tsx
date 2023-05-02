import { AxiosResponse } from 'axios'
import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import { IDeliveryPrice } from '../../shared/interfaces/deliveryInterface/deliveryPrice.interface'
import { $API } from '../api'

export class deliveryService {
	static async getDeliveryOptions(): Promise<Array<IDeliveryOptions>> {
		return $API.get('delivery').then(response => response.data)
	}

	static async setDeliveryPrice(
		payload: IDeliveryPrice,
	): Promise<AxiosResponse> {
		return $API.post<IDeliveryPrice>('delivery/', payload)
	}
}
