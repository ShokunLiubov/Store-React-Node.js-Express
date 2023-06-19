import { $API } from '../api'

export class madeInService {
	static async getAllMadeIn(): Promise<Array<string>> {
		return $API.get('made-in').then(response => response.data)
	}
}
