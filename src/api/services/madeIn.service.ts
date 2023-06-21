import { $API } from '../api'

const MADE_IN = 'made-in'

export class madeInService {
	static async getAllMadeIn(): Promise<Array<string>> {
		return $API.get(MADE_IN).then(response => response.data)
	}
}
