import { AxiosResponse } from 'axios'
import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'
import { IDeliveryPrice } from '../../shared/interfaces/deliveryInterface/deliveryPrice.interface'
import { $API } from '../api'

const DELIVERY = 'delivery'

export class deliveryService {
	static async getDeliveryOptions(): Promise<Array<IDeliveryOptions>> {
		return $API.get(DELIVERY).then(response => response.data)
	}

	static async setDeliveryPrice(
		payload: IDeliveryPrice,
	): Promise<AxiosResponse> {
		return $API.post<IDeliveryPrice>('DELIVERY', payload)
	}
}
