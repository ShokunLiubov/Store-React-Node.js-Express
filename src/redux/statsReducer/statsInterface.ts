import { IOrdersByCity } from '../../shared/stats/ordersByCity.interface'
import { IOrdersByMonth } from '../../shared/stats/ordersByMonth.interface'
import { IRangeDate } from '../../shared/stats/rangeDate.interface'

export interface ISetOrdersByMonth {
    type: string
    ordersByMonth: Array<IOrdersByMonth>
}

export interface ISetYearsFotStats {
    type: string
    years: Array<number>
}

export interface ISetOrdersByCity {
    type: string
    ordersByCity: Array<IOrdersByCity>
}

export interface ISetProfitOverTime {
    type: string
    profit: number
}

export interface ISetRangeProfit {
    type: string
    range: IRangeDate
}