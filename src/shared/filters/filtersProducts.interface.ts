export interface IFiltersProducts {
	[key: string]: any;
	search?: string
	category: Array<string>
    classification: Array<string>
    type_of_aroma: Array<string>
    made_in: Array<string>
    country_of_TM: Array<string>
    gender: Array<string>
	count?: {
		$gte: string
		$lte: string
	}
	price?: {
		$gte: string
		$lte: string
	}
    volume?: {
		$gte: string
		$lte: string
	}
}

