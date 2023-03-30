import { IDeliveryPrice } from '../../shared/interfaces/deliveryInterface/deliveryPrice.interface'
import { $API } from '../api'

export class deliveryService {
	static async getDeliveryOptions(): Promise<Array<any>> {
		return $API.get<Array<any>>('delivery').then(response => response.data)
	}

	static async setDeliveryPrice(payload: IDeliveryPrice): Promise<any> {
		return $API.post<any>('delivery/', payload)
	}
}
