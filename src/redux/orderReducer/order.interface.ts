import { IFiltersOrders } from '../../shared/filters/filtersOrders.interface'
import { IOrder } from '../../shared/interfaces/order.interface'

export interface ISetOrders {
    type: string
    ordersData: Array<IOrder>
	page: number
	totalPages: number
	sortField: string
	sortOrder: string
}

export interface ISetFiltersOrders {
    type: string
    filters: IFiltersOrders
}

export interface ISetCityForOrders {
    type: string
    city: Array<string>
}

