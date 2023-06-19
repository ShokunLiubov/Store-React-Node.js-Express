import { $API } from '../api'

export class countryTMService {
	static async getAllCountryTM(): Promise<Array<string>> {
		return $API.get('country-tm').then(response => response.data)
	}
}
