import { $API } from '../api'

const COUNTRY_TM = 'country-tm'

export class countryTMService {
	static async getAllCountryTM(): Promise<Array<string>> {
		return $API.get(COUNTRY_TM).then(response => response.data)
	}
}
