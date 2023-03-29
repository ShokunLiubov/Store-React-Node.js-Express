export interface IFiltersOrders {
	search?: string
	dataRange?: any
	city: Array<string>
	price?: {
		$gte: string
		$lte: string
	}
	status: Array<string>
	page?: number | string
}