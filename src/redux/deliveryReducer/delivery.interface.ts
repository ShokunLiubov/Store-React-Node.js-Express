import { IDeliveryOptions } from '../../shared/interfaces/deliveryInterface/deliveryOptions.interface'

export interface ISetDeliveryOptions {
    type: string
	payload: IDeliveryOptions[]
}