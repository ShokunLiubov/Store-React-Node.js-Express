export interface IFiltersOrders {
	search?: string
	dataRange?: any
	city: Array<any>
	price?: {
		$gte: string
		$lte: string
	}
	status: Array<any>
}