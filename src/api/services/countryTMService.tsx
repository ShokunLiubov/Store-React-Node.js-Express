import { $API } from '../api'

export class countryTMService {
	static async getAllCountryTM(): Promise<Array<any>> {
		return $API.get<Array<any>>('country-tm').then(response => response.data)
	}
}
