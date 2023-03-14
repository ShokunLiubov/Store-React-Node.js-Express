export interface IFiltersProduct {
	search?: string
	category: Array<string>
	count?: {
		$gte: string
		$lte: string
	}
	price?: {
		$gte: string
		$lte: string
	}
}